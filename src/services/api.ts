import axios, { AxiosResponseHeaders, RawAxiosResponseHeaders, InternalAxiosRequestConfig } from 'axios';
import { COUNTRIES } from '../config/countries';
import env from '../config/env';
import type { Rule } from 'antd/es/form';

const BASE_URL = 'https://restcountries.com/v3.1';

export interface RestCountry {
  name: {
    common: string;
    official: string;
  };
  cca2: string; // ISO 3166-1 alpha-2 code (e.g., 'US', 'AE')
  region: string;
  subregion: string;
}

export interface CustomCountry {
  code: string;
  name: string;
  fields: {
    [key: string]: {
      name: string;
      label: string;
      rules: Rule[];
      type?: string;
    };
  };
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders | RawAxiosResponseHeaders;
  config: InternalAxiosRequestConfig;
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
  getCountries: async (): Promise<ApiResponse<CustomCountry[]>> => {
    try {
      const requiredCountryCodes = ['US', 'AE', 'IN', 'DE', 'CA'];
      const response = await axios.get<RestCountry[]>(`${BASE_URL}/alpha`, {
        params: {
          codes: requiredCountryCodes.join(',')
        }
      });

      // Map the response to match our COUNTRIES format
      const mappedCountries: CustomCountry[] = response.data.map((country: RestCountry) => {
        const configCountry = COUNTRIES.find(c => c.code === country.cca2);
        return {
          code: country.cca2,
          name: country.name.common,
          fields: configCountry?.fields || {}
        };
      });

      return {
        data: mappedCountries,
        status: 200,
        statusText: 'OK',
        headers: response.headers,
        config: response.config
      };
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  },
  getCountry: async (countryCode: string): Promise<RestCountry> => {
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

