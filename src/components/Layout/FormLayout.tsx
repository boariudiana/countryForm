import { Layout, Space, Steps } from 'antd';
import { StepType } from '../../types/form';
import styles from './FormLayout.module.css';

const { Content } = Layout;

interface FormLayoutProps {
  currentStep: number;
  children: React.ReactNode;
}

const steps: { title: string; key: StepType }[] = [
  { title: 'Country', key: 'country' },
  { title: 'Personal Information', key: 'personal' },
  { title: 'Documents', key: 'documents' },
  { title: 'Profile Image', key: 'image' },
  { title: 'Review', key: 'review' },
];

const FormLayout: React.FC<FormLayoutProps> = ({ currentStep, children }) => {
  return (
    <Layout className={styles.container}>
      <Content className={styles.content}>
        <Space direction="vertical" size={36}>
          <Steps
            current={currentStep}
            items={steps.map(({ title }) => ({ title }))}
            responsive
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