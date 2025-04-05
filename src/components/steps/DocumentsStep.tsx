import { Form, Input } from 'antd';
import { COUNTRIES } from '../../config/countries';


const DocumentsStep = () => {
  const form = Form.useFormInstance();
  const countryCode = form.getFieldValue('countryCode');
  const selectedCountry = COUNTRIES.find(c => c.code === countryCode);
  
  if (!selectedCountry) {
    return null;
  }

  const { fields } = selectedCountry;

  // Get the document label based on country
  const getDocumentLabel = () => {
    switch (countryCode) {
      case 'US':
        return 'Social Security Number (SSN)';
      case 'AE':
        return 'Emirates ID';
      case 'IN':
        return 'Aadhaar Number';
      case 'DE':
        return 'Tax ID';
      case 'CA':
        return 'Social Insurance Number (SIN)';
      default:
        return 'Personal ID';
    }
  };

  return (
    <div>
      <h3>Required Documents</h3>
      <p>Please provide your {getDocumentLabel()}</p>
      
      {/* Personal ID Field */}
      <Form.Item
        name={['personalInfo', fields.personalId.name]}
        label={fields.personalId.label}
        rules={fields.personalId.rules}
      >
        <Input />
      </Form.Item>
    </div>
  );
};

export default DocumentsStep; 