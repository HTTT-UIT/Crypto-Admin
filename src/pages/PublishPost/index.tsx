import Label from "@/components/Label";
import RichInput from "@/components/RichInput";
import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card, Col, Divider, Form, Input, InputRef, Row, Select, Space } from "antd";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const PublishPost: any = () => {
  const [form] = Form.useForm();

  const [items, setItems] = useState(["jack", "lucy"]);
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (name == "") {
      return;
    }
    e.preventDefault();
    setItems([...items, name]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/posts">Posts</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Publish post</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Form
          form={form}
          layout="horizontal"
          onFinish={() => {
            console.log(content);
          }}>
          <Row gutter={[80, 0]}>
            <Col span={24}>
              <Label text="Title" requiredMark={true} />
              <Form.Item name="title" rules={[{ required: true, message: "Please type title!" }]}>
                <Input required />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Label text="Tag" requiredMark={true} />
            </Col>
            <Col span={24}>
              <Form.Item name="tag" rules={[{ required: true, message: "Please type tag!" }]}>
                <Select
                  mode="multiple"
                  style={{ width: 300 }}
                  placeholder="Select tag"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      <Space style={{ padding: "0 8px 4px" }}>
                        <Input placeholder="Enter tag name" ref={inputRef} value={name} onChange={onNameChange} />
                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                          Add tag
                        </Button>
                      </Space>
                    </>
                  )}
                  options={items.map((item) => ({ label: item, value: item }))}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Content" rules={[{ required: true, message: "Please type your content!" }]}>
                <RichInput value={content} onChange={(v) => setContent(v)} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item className="flex justify-center">
                <Button type="primary" size="large" htmlType="submit" style={{ width: "400px" }}>
                  Submit for review
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
