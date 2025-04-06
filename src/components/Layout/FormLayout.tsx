import { Layout, Space, Steps, Form } from 'antd';
import styles from './FormLayout.module.css';
import { COUNTRIES } from '../../config/countries';
import { useMemo } from 'react';

const { Content } = Layout;

interface FormLayoutProps {
  currentStep: number;
  children: React.ReactNode;
}

interface StepItem {
  title: string;
  description: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({ currentStep, children }) => {
  const form = Form.useFormInstance();
  const countryCode = Form.useWatch('countryCode', form);
  const selectedCountry = COUNTRIES.find(country => country.code === countryCode);

  const items = useMemo(() => {
    // Base steps that are always shown
    const baseSteps: StepItem[] = [
      { title: 'Country', description: '' }
    ];

    // Conditionally add steps based on selected country
    if (selectedCountry?.fields) {
      // Filter out null values from spread operator
      const conditionalSteps = [
        selectedCountry.fields.personalId && {
          title: selectedCountry.fields.personalId.label,
          description: ''
        },
        selectedCountry.fields.region && {
          title: selectedCountry.fields.region.label,
          description: ''
        },
        selectedCountry.fields.postalCode && {
          title: selectedCountry.fields.postalCode.label,
          description: ''
        },
        selectedCountry.fields.visaType && {
          title: selectedCountry.fields.visaType.label,
          description: ''
        }
      ].filter(Boolean) as StepItem[];

      baseSteps.push(...conditionalSteps);
    }

    // Add final steps that are always shown
    baseSteps.push(
      { title: 'Documents', description: '' },
      { title: 'Profile Image', description: '' },
      { title: 'Review', description: '' }
    );

    return baseSteps;
  }, [selectedCountry]);

  return (
    <Layout className={styles.container}>
      <Content className={styles.content}>
        <Space direction="vertical" size={36} style={{ width: '100%' }}>
          <Steps
            current={currentStep}
            items={items}
            labelPlacement="vertical"
          />
          <div className={styles.card}>
            {children}
          </div>
        </Space>
      </Content>
    </Layout>
  );
};

export default FormLayout; 