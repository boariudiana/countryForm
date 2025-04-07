import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { CountryCode } from '../types/form';


const COUNTRY = {
  LIST: 'countries-list',
  DETAIL: 'countries-detail',
} as const;

const REGIONS = {
  LIST: 'regions-list',
}


export const useCountries = () => {
  return useQuery({
    queryKey: [COUNTRY.LIST],
    queryFn: async () => await api.getCountries()
      
  });
};

export const useRegions = (countryCode: CountryCode) => {
  return useQuery({
    queryKey: [ REGIONS.LIST, countryCode],
    queryFn: () => api.getRegions(countryCode),
    enabled: !!countryCode,
  });
}; 