import validator from 'validator';
import { stdnum } from 'stdnum';

export const validationRules = {
  ssn: (value: string) => stdnum.US.ssn.validate(value).isValid,
  emiratesId: (value: string) => stdnum.AE.emiratesid.validate(value).isValid,
  aadhaar: (value: string) => stdnum.IN.aadhaar.validate(value).isValid,
  taxId: (value: string) => stdnum.DE.idnr.validate(value).isValid,
  sin: (value: string) => stdnum.CA.sin.validate(value).isValid,
  zipCode: (value: string) => validator.isPostalCode(value, 'US'),
  pinCode: (value: string) => validator.isPostalCode(value, 'IN'),
  postleitzahl: (value: string) => validator.isPostalCode(value, 'DE'),
  postalCode: (value: string) => validator.isPostalCode(value, 'CA'),
};

export const getValidationMessage = (fieldName: string): string => {
  const messages: Record<string, string> = {
    ssn: 'Please enter a valid SSN (e.g., 123-45-6789)',
    emiratesId: 'Please enter a valid Emirates ID',
    aadhaar: 'Please enter a valid Aadhaar number',
    taxId: 'Please enter a valid 11-digit Tax ID',
    sin: 'Please enter a valid SIN (e.g., 123-456-789)',
    zipCode: 'Please enter a valid ZIP code',
    pinCode: 'Please enter a valid 6-digit PIN code',
    postleitzahl: 'Please enter a valid 5-digit postal code',
    postalCode: 'Please enter a valid postal code (e.g., A1A 1A1)',
  };

  return messages[fieldName] || 'Invalid value';
}; 