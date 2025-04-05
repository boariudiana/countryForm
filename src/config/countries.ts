import { validationRules, getValidationMessage } from '../utils/validation';

export const COUNTRIES = [
  {
    code: 'US',
    name: 'United States',
    fields: {
      personalId: {
        name: 'ssn',
        label: 'Social Security Number',
        rules: [
          { required: true, message: 'SSN is required' },
          { 
            validator: (value: string) => validationRules.ssn(value),
            message: () => getValidationMessage('ssn')
          }
        ]
      },
      region: {
        name: 'state',
        label: 'State',
        type: 'select',
        rules: [{ required: true, message: 'State is required' }]
      },
      postalCode: {
        name: 'zipCode',
        label: 'ZIP Code',
        rules: [
          { required: true, message: 'ZIP Code is required' },
          { 
            validator: (value: string) => validationRules.zipCode(value),
            message: () => getValidationMessage('zipCode')
          }
        ]
      }
    }
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    fields: {
      personalId: {
        name: 'emiratesId',
        label: 'Emirates ID',
        rules: [
          { required: true, message: 'Emirates ID is required' },
          { 
            validator: (value: string) => validationRules.emiratesId(value),
            message: () => getValidationMessage('emiratesId')
          }
        ]
      },
      region: {
        name: 'city',
        label: 'City',
        type: 'select',
        rules: [{ required: true, message: 'City is required' }]
      },
      visaType: {
        name: 'visaType',
        label: 'Visa Type',
        type: 'select',
        rules: [{ required: true, message: 'Visa type is required' }]
      }
    }
  },
  {
    code: 'IN',
    name: 'India',
    fields: {
      personalId: {
        name: 'aadhaar',
        label: 'Aadhaar Number',
        rules: [
          { required: true, message: 'Aadhaar number is required' },
          { 
            validator: (value: string) => validationRules.aadhaar(value),
            message: () => getValidationMessage('aadhaar')
          }
        ]
      },
      region: {
        name: 'state',
        label: 'State',
        type: 'select',
        rules: [{ required: true, message: 'State is required' }]
      },
      postalCode: {
        name: 'pinCode',
        label: 'PIN Code',
        rules: [
          { required: true, message: 'PIN code is required' },
          { 
            validator: (value: string) => validationRules.pinCode(value),
            message: () => getValidationMessage('pinCode')
          }
        ]
      }
    }
  },
  {
    code: 'DE',
    name: 'Germany',
    fields: {
      personalId: {
        name: 'taxId',
        label: 'Tax ID',
        rules: [
          { required: true, message: 'Tax ID is required' },
          { 
            validator: (value: string) => validationRules.taxId(value),
            message: () => getValidationMessage('taxId')
          }
        ]
      },
      region: {
        name: 'bundesland',
        label: 'Bundesland',
        type: 'select',
        rules: [{ required: true, message: 'Bundesland is required' }]
      },
      postalCode: {
        name: 'postleitzahl',
        label: 'Postal Code',
        rules: [
          { required: true, message: 'Postal code is required' },
          { 
            validator: (value: string) => validationRules.postleitzahl(value),
            message: () => getValidationMessage('postleitzahl')
          }
        ]
      }
    }
  },
  {
    code: 'CA',
    name: 'Canada',
    fields: {
      personalId: {
        name: 'sin',
        label: 'Social Insurance Number',
        rules: [
          { required: true, message: 'SIN is required' },
          { 
            validator: (value: string) => validationRules.sin(value),
            message: () => getValidationMessage('sin')
          }
        ]
      },
      region: {
        name: 'province',
        label: 'Province',
        type: 'select',
        rules: [{ required: true, message: 'Province is required' }]
      },
      postalCode: {
        name: 'postalCode',
        label: 'Postal Code',
        rules: [
          { required: true, message: 'Postal code is required' },
          { 
            validator: (value: string) => validationRules.postalCode(value),
            message: () => getValidationMessage('postalCode')
          }
        ]
      }
    }
  }
]; 