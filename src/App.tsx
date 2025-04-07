import { Button, Form, Layout, Space, Steps, message, ConfigProvider } from 'antd';
import { useState, useEffect } from 'react';
import styles from './App.module.css';
import CountryStep from './components/steps/CountryStep';
import VisaStep from './components/steps/VisaStep';
import DocumentsStep from './components/steps/DocumentsStep';
import ProfileImageStep from './components/steps/ProfileImageStep';
import ReviewStep from './components/steps/ReviewStep';
import type { FormData } from './types/form';
import RegionStep from './components/steps/RegionStep';
import { COUNTRIES } from './config/countries';
import PostalCodeStep from './components/steps/PostalCodeStep';

const { Content } = Layout;

const FORM_STORAGE_KEY = 'countryFormData';

export default function App() {
  const [form] = Form.useForm<FormData>();
  const [currentStep, setCurrentStep] = useState(0);

  // Load saved form data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.setFieldsValue(parsedData);
      } catch (error) {
        console.error('Error loading saved form data:', error);
        localStorage.removeItem(FORM_STORAGE_KEY);
      }
    }
  }, [form]);

  const currentCountry = form.getFieldValue('countryCode');

  const availablefieds = COUNTRIES.find(country => country.code === currentCountry)?.fields;

  const shouldRenderVisaStep = availablefieds?.visaType;
  const shouldRenderPostalCodeStep = availablefieds?.postalCode;
  
  const handleFinish = () => {
    message.success('Form submitted successfully!');
    form.resetFields();
    setCurrentStep(0);
    localStorage.removeItem(FORM_STORAGE_KEY); // Clear saved data on successful submission
  };

  const next = async () => {
    try {
      await form.validateFields();
      // Save form data to local storage before moving to next step
      const formData = form.getFieldsValue(true);
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
      setCurrentStep(prev => prev + 1);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const prev = () => {
    // Save form data to local storage before moving to previous step
    const formData = form.getFieldsValue(true);
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    setCurrentStep(prev => prev - 1);
  };

  const progressBarSteps = [
    { title: 'Country', key: 'country'  },
    { title: 'Region', key: 'region' },
    shouldRenderVisaStep && { title: 'Visa', key: 'visa'  },
    shouldRenderPostalCodeStep && { title: 'Postal Code', key: 'postalcode'  },
    { title: 'Documents', key: 'documents'  },
    { title: 'Profile Image', key: 'image' },
    { title: 'Review', key: 'review'  }
  ].filter(Boolean)

  const steps = [
    { title: 'Country', content: <CountryStep /> },
    { title: 'Region', content: <RegionStep /> },
    shouldRenderVisaStep && { title: 'Visa', content: <VisaStep /> },
    shouldRenderPostalCodeStep && { title: 'Postal Code', content: <PostalCodeStep /> },
    { title: 'Documents', content: <DocumentsStep /> },
    { title: 'Profile Image', content: <ProfileImageStep /> },
    { title: 'Review', content: <ReviewStep /> }
  ].filter(Boolean)

  const currentStepConfig = steps[currentStep];

  return (
    <ConfigProvider>
      <div className={styles.root}>
        <Layout className={styles.container}>
          <Content className={styles.content}>
            <Space direction="vertical" size={36}>
              <Steps
                current={currentStep}
                items={progressBarSteps.filter(step => step !== undefined).map(({ title }) => ({ title }))}
                responsive
                labelPlacement="vertical"
              />
              <div className={styles.card}>
                <Form 
                  form={form} 
                  onFinish={handleFinish} 
                  layout="vertical"
                  initialValues={{ 
                    personalInfo: {},
                    countryCode: undefined,
                    profileImage: []
                  }}
                  preserve={true}
                >
                  <div>
                    {currentStepConfig?.content}
                  </div>
                  <div className={styles.stepsAction}>
                    <Space>
                      {currentStep > 0 && (
                        <Button onClick={prev}>Previous</Button>
                      )}
                      {currentStep < steps.length - 1 ? (
                        <Button type="primary" onClick={next}>
                          Next
                        </Button>
                      ) : (
                        <Button type="primary" onClick={() => form.submit()}>
                          Submit
                        </Button>
                      )}
                    </Space>
                  </div>
                </Form>
              </div>
            </Space>
          </Content>
        </Layout>
      </div>
    </ConfigProvider>
  );
}
