import { Card, Col, Row } from "antd";
import { FC } from "react";

const Home: FC = () => {
  return (
    <div className="min-h-screen">
      <Row gutter={[20, 20]}>
        <Col span={8}>
          <Card bordered>
            <h4 className="text-2xl font-semibold">Số bài viết mới</h4>
            <p className="text-blue-600 text-xl font-bold">10</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered>
            <h4 className="text-2xl font-semibold">Số bài viết đã duyệt</h4>
            <p className="text-blue-600 text-xl font-bold">10</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered>
            <h4 className="text-2xl font-semibold">Số bài viết từ chối</h4>
            <p className="text-blue-600 text-xl font-bold">10</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
