import { COUNTRIES } from '../config/countries';

export type CountryCode = typeof COUNTRIES[number]['code'];

export interface FormData {
  country: CountryCode;
  personalInfo: {
    [key: string]: string;
  };
  profileImage?: File;
}

export type StepType = 'country' | 'personal' | 'documents' | 'image' | 'review'; 