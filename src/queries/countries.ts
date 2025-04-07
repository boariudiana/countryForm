import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import type { COUNTRIES } from '../config/countries';
import { CountryCode } from '../types/form';

type Country = typeof COUNTRIES[number];

const COUNTRY = {
  LIST: 'countries-list',
  DETAIL: 'countries-detail',
} as const;

const REGIONS = {
  LIST: 'regions-list',
}


export const useCountries = () => {
  return useQuery<Country[]>({
    queryKey: [COUNTRY.LIST],
    queryFn: async () => {
      const response = await api.getCountries();
      return response.data;
    }
  });
};

export const useRegions = (countryCode: CountryCode) => {
  return useQuery({
    queryKey: [ REGIONS.LIST, countryCode],
    queryFn: () => api.getRegions(countryCode),
    enabled: !!countryCode,
  });
}; 