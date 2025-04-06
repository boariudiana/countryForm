import { Descriptions, Image, Form } from 'antd';
import { COUNTRIES } from '../../config/countries';

const ReviewStep = () => {
  const form = Form.useFormInstance();
  const formValues = form.getFieldsValue(true);

  const countryCode = formValues.countryCode;
  const selectedCountry = COUNTRIES.find(country => country.code === countryCode);

  if (!selectedCountry) {
    return <div>Please select a country first</div>;
  }

  const { fields } = selectedCountry;

  const getFieldValue = (fieldName: string) => {
    const value = formValues.personalInfo?.[fieldName];
    return value ? value.toString() : 'Not provided';
  };

  const getFieldLabel = (fieldName: keyof typeof fields) => {
    return fields[fieldName]?.label || fieldName;
  };

  const getVisaTypeLabel = (value: string) => {
    switch (value) {
      case 'tourist':
        return 'Tourist Visa';
      case 'work':
        return 'Work Visa';
      case 'student':
        return 'Student Visa';
      case 'resident':
        return 'Residence Visa';
      default:
        return value;
    }
  };

  return (
    <div>
      <h3>Review Your Information</h3>
      <p>Please review your information before submitting</p>
      
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Country">
          {selectedCountry.name}
        </Descriptions.Item>

        {fields.region && (
          <Descriptions.Item label={getFieldLabel('region')}>
            {getFieldValue(fields.region.name)}
          </Descriptions.Item>
        )}

        {fields.visaType && (
          <Descriptions.Item label={getFieldLabel('visaType')}>
            {getVisaTypeLabel(getFieldValue(fields.visaType.name))}
          </Descriptions.Item>
        )}

        {fields.postalCode && (
          <Descriptions.Item label={getFieldLabel('postalCode')}>
            {getFieldValue(fields.postalCode.name)}
          </Descriptions.Item>
        )}

        {fields.personalId && (
          <Descriptions.Item label={getFieldLabel('personalId')}>
            {getFieldValue(fields.personalId.name)}
          </Descriptions.Item>
        )}

        <Descriptions.Item label="Profile Image">
          {formValues.profileImage?.[0] ? (
            <Image
              src={URL.createObjectURL(formValues.profileImage[0].originFileObj)}
              alt="Profile"
              width={100}
              height={100}
              style={{ objectFit: 'cover' }}
            />
          ) : (
            'No image uploaded'
          )}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ReviewStep; 