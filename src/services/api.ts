import axios from 'axios';
import { COUNTRIES } from '../config/countries';
import env from '../config/env';

// Simulating API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const BASE_URL = 'https://restcountries.com/v3.1';

export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string; // ISO 3166-1 alpha-2 code (e.g., 'US', 'AE')
  region: string;
  subregion: string;
}

export interface Region {
  value: string;
  label: string;
}

interface GeonamesRegion {
  geonameId: number;
  name: string;
  adminCode1: string;
  countryCode: string;
}

interface GeonamesResponse {
  geonames: GeonamesRegion[];
}

export const api = {
  getCountries: async () => {
    await delay(1000); // Simulate network delay
    return {
      data: COUNTRIES,
      status: 200,
      statusText: 'OK',
      headers: {
        'content-type': 'application/json',
      },
      config: {
        url: '/api/countries',
        method: 'get',
        headers: {
          Accept: 'application/json',
        },
      },
    };
  },
  getCountry: async (countryCode: string): Promise<Country> => {
    const response = await axios.get(`${BASE_URL}/alpha/${countryCode}`);
    return response.data[0];
  },

  getRegions: async (countryCode: string): Promise<Region[]> => {
    try {
      const username = env.GEONAMES_USERNAME;
      if (!username) {
        throw new Error('Geonames API username is not configured');
      }

      // First get the country's geonameId
      const countrySearch = await axios.get<GeonamesResponse>(`http://api.geonames.org/searchJSON`, {
        params: {
          country: countryCode,
          username,
          style: 'FULL',
          maxRows: 1
        }
      });

      if (!countrySearch.data.geonames || countrySearch.data.geonames.length === 0) {
        throw new Error(`Country not found: ${countryCode}`);
      }

      const countryGeonameId = countrySearch.data.geonames[0].geonameId;


      // Now get the subdivisions using the country's geonameId
      const response = await axios.get<GeonamesResponse>(`http://api.geonames.org/childrenJSON`, {
        params: {
          geonameId: countryGeonameId,
          username,
          style: 'FULL'
        }
      });
      
      if (!response.data.geonames || response.data.geonames.length === 0) {
        throw new Error(`No subdivisions found for ${countryCode}`);
      }

      return response.data.geonames.map((region) => ({
        value: region.geonameId.toString(),
        label: region.name
      }));
    } catch (error) {
      console.error('Error fetching regions:', error);
      throw error; 
    }
  }
}; 

