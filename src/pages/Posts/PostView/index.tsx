import { Card, Col, Row, Tag } from "antd";
import { FC } from "react";
import data from "./data.json";

const PostView: FC = () => {
  return (
    <Row gutter={[20, 20]}>
      <Col span={16}>
        <Card>
          <h3 className="text-3xl font-bold">{data.title}</h3>
          <p>Author name - 11/11/2022</p>
          {data.tags.map((item) => (
            <Tag>{item}</Tag>
          ))}
          <p style={{ marginTop: 20 }} dangerouslySetInnerHTML={{ __html: data?.content }}>
            {/* {data.content} */}
          </p>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <h3>Comments</h3>
        </Card>
      </Col>
    </Row>
  );
};

export default PostView;
