import { Button, Form, Layout, Space, Steps, message } from 'antd';
import { useState } from 'react';
import styles from './App.module.css';
import CountryStep from './components/steps/CountryStep';
import VisaStep from './components/steps/VisaStep';
import DocumentsStep from './components/steps/DocumentsStep';
import ProfileImageStep from './components/steps/ProfileImageStep';
import ReviewStep from './components/steps/ReviewStep';
import type { FormData, StepType } from './types/form';
import RegionStep from './components/steps/RegionStep';
import { COUNTRIES } from './config/countries';
import PostalCodeStep from './components/steps/PostalCodeStep';

const { Content } = Layout;

export default function App() {
  const [form] = Form.useForm<FormData>();
  const [currentStep, setCurrentStep] = useState(0);

  const currentCountry = form.getFieldValue('countryCode');

  const availablefieds = COUNTRIES.find(country => country.code === currentCountry)?.fields;

  const shouldRenderVisaStep = availablefieds?.visaType;
  const shouldRenderPostalCodeStep = availablefieds?.postalCode;
  
  const handleFinish = () => {
    message.success('Form submitted successfully!');
    form.resetFields();
    setCurrentStep(0);
  };

  const next = async () => {
    try {
      await form.validateFields();
      setCurrentStep(prev => prev + 1);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const prev = () => {
    setCurrentStep(prev => prev - 1);
  };


  const progressBarSteps: { title: string; key: StepType }[] = [
    { title: 'Country', key: 'country' },
    { title: 'Region', key: 'region' },
    ...(shouldRenderVisaStep ? [{ title: 'Visa', key: 'visa' as const }] : []),
    ...(shouldRenderPostalCodeStep ? [{ title: 'Postal Code', key: 'postalCode' as const }] : []),
    { title: 'Documents', key: 'documents' },
    { title: 'Profile Image', key: 'image' },
    { title: 'Review', key: 'review' },
  ];

  const steps = [
    { title: 'Country', content: <CountryStep /> },
    { title: 'Region', content: <RegionStep /> },
    ...(shouldRenderVisaStep ? [{ title: 'Visa', content: <VisaStep /> }] : []),
    ...(shouldRenderPostalCodeStep ? [{ title: 'Postal Code', content: <PostalCodeStep /> }] : []),
    { title: 'Documents', content: <DocumentsStep /> },
    { title: 'Profile Image', content: <ProfileImageStep /> },
    { title: 'Review', content: <ReviewStep /> }
  ];

  const currentStepConfig = steps[currentStep];

  return (
    <div className={styles.root}>
      <Layout className={styles.container}>
      <Content className={styles.content}>
        <Space direction="vertical" size={36}>
          <Steps
            current={currentStep}
            items={progressBarSteps.map(({ title }) => ({ title }))}
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
  );
}
