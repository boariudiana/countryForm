import { Layout, Steps } from 'antd';
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
        <div className={styles.wrapper}>
          <Steps
            current={currentStep}
            items={steps.map(({ title }) => ({ title }))}
          />
          <div className={styles.card}>
            {children}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default FormLayout; 