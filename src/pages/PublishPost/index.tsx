import LabelInput from "@/components/Input/LabelInput";
import RichInput from "@/components/RichInput";
import { Breadcrumb, Button, Card, Col, Form, Input, Row } from "antd";
import { Link } from "react-router-dom";

const PublishPost: any = () => {
  const [form] = Form.useForm();

  return (
    <>
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/posts">Posts</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Publish post</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Form form={form} layout="horizontal">
          <Row gutter={[80, 0]}>
            <Col span={24}>
              <Form.Item name="title" rules={[{ required: true, message: "Please type title!" }]}>
                <LabelInput label={"Title"} requiredMark></LabelInput>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="tag" rules={[{ required: true, message: "Please type tag!" }]}>
                <LabelInput label={"Tag"} requiredMark></LabelInput>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="Content"
                rules={[{ required: true, message: "Please type your content!" }]}>
                <RichInput />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item className="flex justify-center">
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="!rounded"
                  style={{ width: "400px" }}>
                  Publish
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default PublishPost;
