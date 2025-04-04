import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Col,
  Row,
  Typography,
  Layout,
  Space,
  Skeleton,
  Result,
} from "antd";
import axios from "axios";
import styles from "./App.module.css";

const { Text } = Typography;
const { Content } = Layout;

interface Country {
  name: {
    common: string;
  };
  capital?: string[];
  population: number;
}

function App() {
  const {
    data: countries,
    isLoading,
    error,
  } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");
      return data;
    },
  });

  if (error)
    return (
      <Layout className={styles.mainLayout}>
        <Content className={styles.mainContent}>
          <Result
            status="error"
            title="Failed to fetch countries"
            subTitle={error.message}
          />
        </Content>
      </Layout>
    );

  return (
    <Layout className={styles.mainLayout}>
      <Content className={styles.mainContent}>
        <Space
          direction="vertical"
          size="large"
          className={styles.contentSpace}
        >
          <Typography.Title level={1}>Countries List</Typography.Title>
          <Skeleton loading={isLoading} active>
            <Row gutter={[16, 16]}>
              {countries?.slice(0, 10).map((country) => (
                <Col xs={24} sm={12} md={8} lg={6} key={country.name.common}>
                  <Card
                    title={
                      <Typography.Title level={4}>
                        {country.name.common}
                      </Typography.Title>
                    }
                    hoverable
                  >
                    <Space direction="vertical">
                      <Text strong>Capital:</Text>{" "}
                      {country.capital?.[0] || "N/A"}
                      <Text strong>Population:</Text>{" "}
                      {country.population.toLocaleString()}
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Skeleton>
        </Space>
      </Content>
    </Layout>
  );
}

export default App;
