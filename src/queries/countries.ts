import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const QueryNames = {
  list: 'countries-list',
  details: 'country-details',
} as const;

interface Country {
  name: {
    common: string;
  };
  capital?: string[];
  population: number;
}

export const useCountries = () => {
  return useQuery<Country[]>({
    queryKey: [QueryNames.list],
    queryFn: async () => {
      const { data } = await axios.get('https://restcountries.com/v3.1/all');
      return data;
    },
  });
};

export const useCountry = (countryName: string) => {
  return useQuery<Country>({
    queryKey: [QueryNames.details, countryName],
    queryFn: async () => {
      const { data } = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
      return data[0];
    },
  });
}; 