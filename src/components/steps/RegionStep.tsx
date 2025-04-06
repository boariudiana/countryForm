import { Form, Input, Select} from 'antd';

import { COUNTRIES } from '../../config/countries';
import { useRegions } from '../../queries/countries';


const RegionStep = () => {

  const form = Form.useFormInstance();
  const countryCode = form.getFieldValue('countryCode');
  const { data: regionOptions, isLoading} = useRegions(countryCode);


  const selectedCountry = COUNTRIES.find(country => country.code === countryCode);
  if (!selectedCountry) {
    return null;
  }

  const { fields } = selectedCountry;

  if (!fields) {
    return null;
  }

  return (
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
  );
};

export default RegionStep; 