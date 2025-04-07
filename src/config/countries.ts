import { createValidator, getValidationMessage } from '../utils/validation';
import type { Rule } from 'antd/es/form';

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
            type: 'string',
            validator: createValidator('ssn'),
            message: () => getValidationMessage('ssn')
          }
        ] as Rule[]
      },
      region: {
        name: 'state',
        label: 'State',
        type: 'select',
        rules: [{ required: true, message: 'State is required' }] as Rule[]
      },
      postalCode: {
        name: 'zipCode',
        label: 'ZIP Code',
        rules: [
          { required: true, message: 'ZIP Code is required' },
          { 
            type: 'string',
            validator: createValidator('zipCode'),
            message: () => getValidationMessage('zipCode')
          }
        ] as Rule[]
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
            type: 'string',
            validator: createValidator('emiratesId'),
            message: () => getValidationMessage('emiratesId')
          }
        ] as Rule[]
      },
      region: {
        name: 'city',
        label: 'City',
        type: 'select',
        rules: [{ required: true, message: 'City is required' }] as Rule[]
      },
      visaType: {
        name: 'visaType',
        label: 'Visa Type',
        type: 'select',
        rules: [{ required: true, message: 'Visa type is required' }] as Rule[]
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
            type: 'string',
            validator: createValidator('aadhaar'),
            message: () => getValidationMessage('aadhaar')
          }
        ] as Rule[]
      },
      region: {
        name: 'state',
        label: 'State',
        type: 'select',
        rules: [{ required: true, message: 'State is required' }] as Rule[]
      },
      postalCode: {
        name: 'pinCode',
        label: 'PIN Code',
        rules: [
          { required: true, message: 'PIN code is required' },
          { 
            type: 'string',
            validator: createValidator('pinCode'),
            message: () => getValidationMessage('pinCode')
          }
        ] as Rule[]
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
            type: 'string',
            validator: createValidator('taxId'),
            message: () => getValidationMessage('taxId')
          }
        ] as Rule[]
      },
      region: {
        name: 'bundesland',
        label: 'Bundesland',
        type: 'select',
        rules: [{ required: true, message: 'Bundesland is required' }] as Rule[]
      },
      postalCode: {
        name: 'postleitzahl',
        label: 'Postal Code',
        rules: [
          { required: true, message: 'Postal code is required' },
          { 
            type: 'string',
            validator: createValidator('postleitzahl'),
            message: () => getValidationMessage('postleitzahl')
          }
        ] as Rule[]
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
            type: 'string',
            validator: createValidator('sin'),
            message: () => getValidationMessage('sin')
          }
        ] as Rule[]
      },
      region: {
        name: 'province',
        label: 'Province',
        type: 'select',
        rules: [{ required: true, message: 'Province is required' }] as Rule[]
      },
      postalCode: {
        name: 'postalCode',
        label: 'Postal Code',
        rules: [
          { required: true, message: 'Postal code is required' },
          { 
            type: 'string',
            validator: createValidator('postalCode'),
            message: () => getValidationMessage('postalCode')
          }
        ] as Rule[]
      }
    }
  }
];