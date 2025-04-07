import { COUNTRIES } from '../config/countries';

type Country = typeof COUNTRIES[number];

interface CountryValidationResult {
  country: Country | null;
  error: string | null;
}

export const useCountryValidation = (countryCode: string | undefined): CountryValidationResult => {
  if (!countryCode) {
    return {
      country: null,
      error: 'Please select a country first'
    };
  }

  const country = COUNTRIES.find(c => c.code === countryCode);
  
  if (!country) {
    return {
      country: null,
      error: 'Invalid country selected'
    };
  }

  return { country, error: null };
}; 