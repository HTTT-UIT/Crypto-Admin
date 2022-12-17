import { Button, Col, Form, Input, Row, Select, Tag } from "antd";
import { FC } from "react";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";

const options = [{ value: "gold" }, { value: "lime" }, { value: "green" }, { value: "cyan" }];

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}>
      {label}
    </Tag>
  );
};

const FromTag: FC = () => {
  return (
    <Form layout="vertical">
      <Row gutter={[20, 0]}>
        <Col span={24}>
          <Form.Item label="Tag name" name="title" rules={[{ required: true, message: "Please input tag name!" }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Color" name="color" rules={[{ required: true, message: "Please input your username!" }]}>
            <Select mode="multiple" showArrow tagRender={tagRender} style={{ width: "100%" }} options={options} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Button block>Cancel</Button>
        </Col>
        <Col span={12}>
          <Button block type="primary">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FromTag;
