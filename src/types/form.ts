import { COUNTRIES } from '../config/countries';

export type CountryCode = typeof COUNTRIES[number]['code'];

export interface FormData {
  countryCode: CountryCode;
  personalInfo: {
    [key: string]: string;
  };
  profileImage?: File;
}

export type StepType = 'country' | 'region' | 'visa' | 'postalCode' | 'documents' | 'image' | 'review'; 