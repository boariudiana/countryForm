import { Form, Select } from 'antd';
import { useCountries } from '../../queries/countries';


const CountryStep = () => {
  const { data: countries, isLoading } = useCountries();

  return (
    <Form.Item
      name="countryCode"
      label="Select Country"
      rules={[{ required: true, message: 'Please select a country' }]}
    >
      <Select
        placeholder="Select a country"
        loading={isLoading}
        options={countries?.map(country => ({
          label: country.name,
          value: country.code
        }))}
      />
    </Form.Item>
  );
};

export default CountryStep; 