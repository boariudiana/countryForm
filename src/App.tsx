import { Button, Form, Space } from 'antd';
import { useState } from 'react';
import styles from './App.module.css';
import CountryStep from './components/steps/CountryStep';
import FormLayout from './components/Layout/FormLayout';
import type { FormData } from './types/form';

export default function App() {
  const [form] = Form.useForm<FormData>();
  const [currentStep, setCurrentStep] = useState(0);

  const handleFinish = (values: FormData) => {
    console.log('Form values:', values);
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

  return (
    <div className={styles.root}>
      <FormLayout currentStep={currentStep}>
        <Form 
          form={form} 
          onFinish={handleFinish} 
          layout="vertical"
        >
          <div>
            {currentStep === 0 && <CountryStep />}
          </div>
          <div className={styles.stepsAction}>
            <Space>
              {currentStep > 0 && (
                <Button onClick={prev}>Previous</Button>
              )}
              {currentStep < 4 ? (
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
      </FormLayout>
    </div>
  );
}
