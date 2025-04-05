import axios from 'axios';
import { COUNTRIES } from '../config/countries';

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
    const response = await axios.get(`${BASE_URL}/alpha/${countryCode}`);
    const country = response.data[0];
    console.log('Country: from api', country);
    // Convert API response to consistent Region format
    const regions = country.subdivisions || {};
    console.log('Regions: from api', regions);
    return Object.entries(regions).map(([code, name]) => ({
      value: code,
      label: name as string
    }));
  }
}; 

