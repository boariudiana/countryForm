import validator from 'validator';

export const validationRules = {
  ssn: (value: string) => /^\d{3}-\d{2}-\d{4}$/.test(value),
  emiratesId: (value: string) => /^\d{3}-\d{4}-\d{7}-\d{1}$/.test(value),
  aadhaar: (value: string) => /^\d{4}\s?\d{4}\s?\d{4}$/.test(value),
  taxId: (value: string) => /^\d{11}$/.test(value),
  sin: (value: string) => /^\d{3}-\d{3}-\d{3}$/.test(value),
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