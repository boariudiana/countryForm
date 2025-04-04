import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import type { COUNTRIES } from '../config/countries';

type Country = typeof COUNTRIES[number];

export const useCountries = () => {
  return useQuery<Country[]>({
    queryKey: ['countries'],
    queryFn: async () => {
      const response = await api.getCountries();
      return [...response.data];
    },
  });
};
