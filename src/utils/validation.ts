import validator from 'validator';
import { stdnum } from 'stdnum';
import { Rule } from 'antd/es/form';

// Simple pattern for Emirates ID with explicit character set
const EMIRATES_ID_PATTERN = /^784-[0-9]{4}-[0-9]{7}-[0-9]$/;
const MAX_ID_LENGTH = 20;

/**
 * Validates an Emirates ID number
 */
const validateEmiratesId = (id: string): boolean => {
  // Basic input validation
  if (!id || typeof id !== 'string') return false;
  
  // Length check before regex test to prevent ReDoS
  if (id.length > MAX_ID_LENGTH) return false;
  
  return EMIRATES_ID_PATTERN.test(id);
};

export const validationRules = {
  ssn: (value: string) => stdnum.US.ssn.validate(value).isValid,
  emiratesId: validateEmiratesId,
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
    emiratesId: 'Please enter a valid Emirates ID (e.g., 784-1980-1234567-1)',
    aadhaar: 'Please enter a valid 12-digit Aadhaar number (e.g., 234123412346)',
    taxId: 'Please enter a valid 11-digit Tax ID (e.g., 36 574 261 809)',
    sin: 'Please enter a valid SIN (e.g., 123-456-789)',
    zipCode: 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)',
    pinCode: 'Please enter a valid 6-digit PIN code (e.g., 123456)',
    postleitzahl: 'Please enter a valid 5-digit postal code (e.g., 10115)',
    postalCode: 'Please enter a valid postal code (e.g., A1A 1A1)',
  };

  return messages[fieldName] || 'Invalid value';
};

export const createValidator = (ruleName: keyof typeof validationRules) => {
  return (_: Rule, value: string) => {
    if (!value) return Promise.reject(new Error('Value is required'));
    
    return validationRules[ruleName](value) 
      ? Promise.resolve() 
      : Promise.reject(new Error(getValidationMessage(ruleName)));
  };
}; 