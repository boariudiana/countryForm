import { COUNTRIES } from '../config/countries';

// Simulating API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
  }
}; 