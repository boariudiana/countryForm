import { Form, Input} from 'antd';

import { COUNTRIES } from '../../config/countries';


const PostalCodeStep = () => {

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
    </div>
  );
};

export default PostalCodeStep; 