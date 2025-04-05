import { Form, Input, Select} from 'antd';

import { COUNTRIES } from '../../config/countries';
import { useRegions } from '../../queries/countries';


const PersonalInformationStep = () => {

  const form = Form.useFormInstance();
  const countryCode = form.getFieldValue('countryCode');
  const { data: regionOptions, isLoading} = useRegions(countryCode);

  console.log('regionOptions', regionOptions);


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
      {/* Region Field */}
      <Form.Item
        name={['personalInfo', fields.region.name]}
        label={fields.region.label}
        rules={fields.region.rules}
      >
        {fields.region.type === 'select' ? (
          <Select 
            options={regionOptions} 
            loading={isLoading}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            optionFilterProp="label"
          />
        ) : (
          <Input />
        )}
      </Form.Item>

      {/* Postal Code Field */}
      {fields.postalCode && (
        <Form.Item
          name={['personalInfo', fields.postalCode.name]}
          label={fields.postalCode.label}
          rules={fields.postalCode.rules}
        >
          <Input />
        </Form.Item>
      )}

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

export default PersonalInformationStep; 