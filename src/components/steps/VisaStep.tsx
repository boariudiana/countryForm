import { Form, Select} from 'antd';

import { COUNTRIES } from '../../config/countries';


const VisaStep = () => {

  const form = Form.useFormInstance();
  const countryCode = form.getFieldValue('countryCode');

  const selectedCountry = COUNTRIES.find(country => country.code === countryCode);
  if (!selectedCountry) {
    return null;
  }

  const { fields } = selectedCountry;

  if (!fields) {
    return null;
  }

  return (
    <div>

      {/* Visa Type Field */}
      {fields.visaType && (
        <Form.Item
          name={['personalInfo', fields.visaType.name]}
          label={fields.visaType.label}
          rules={fields.visaType.rules}
        >
          <Select 
            options={[
              { value: 'tourist', label: 'Tourist Visa' },
              { value: 'work', label: 'Work Visa' },
              { value: 'student', label: 'Student Visa' },
              { value: 'resident', label: 'Residence Visa' }
            ]} 
          />
        </Form.Item>
      )}
    </div>
  );
};

export default VisaStep; 