import blogApi from "@/api/blogApi";
import tagApi from "@/api/tagApi";
import Label from "@/components/Label";
import RichInput from "@/components/RichInput";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";
import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Card, Col, Divider, Form, Input, InputRef, Row, Select, Space, message } from "antd";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditPost: any = () => {
  const [form] = Form.useForm();
  const { id } = useParams();

  const [blog, setBlog] = useState<Blog>();
  const [tagList, setTagList] = useState<TagBlog[]>([]);
  const [content, setContent] = useState("");
  const [tagName, setTagName] = useState("");
  const [defaultTag, setDefaultTag] = useState<TagBlog[]>([]);
  const inputRef = useRef<InputRef>(null);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(event.target.value);
  };

  const addItem = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (tagName == "") {
      return;
    }
    e.preventDefault();
    const newTag = await tagApi.create(tagName);
    setTagList([...tagList, newTag?.value]);
    setTagName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const res = await blogApi.getOne(id);
        setBlog(res);

        var defaultTag = [];
        if (res?.tags?.length > 0) {
          res.tags.forEach((tag) => {
            defaultTag.push(tag?.id);
          });
        }
        form.setFieldsValue({ title: res?.header, content: res?.content, tag: defaultTag });
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetch = async () => {
      const res = await tagApi.getList();
      setTagList(res?.items);
    };

    fetch();
  }, []);

  const submit = async () => {
    try {
      console.log(form.getFieldsValue());
      const { content, title, tag } = form.getFieldsValue();
      const res = await blogApi.update({ id: id, header: title, content: content, tagIDs: tag, authorID: user?.id });
      console.log(res);
      navigate("/posts");
    } catch (error) {
      message.error("Đã xảy ra lỗi!");
      console.log(error);
    }
  };

  return (
    <>
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/posts">Bài viết</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Viết bài</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Form form={form} layout="horizontal" onFinish={submit}>
          <Row gutter={[80, 0]}>
            <Col span={24}>
              <Label text="Tiêu đề" requiredMark={true} />
              <Form.Item name="title" rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}>
                <Input required />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Label text="Tag" />
            </Col>
            <Col span={24}>
              <Form.Item name="tag">
                <Select
                  mode="multiple"
                  style={{ width: 300 }}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      <Space style={{ padding: "0 8px 4px" }}>
                        <Input placeholder="Nhập tag" ref={inputRef} value={tagName} onChange={onNameChange} />
                        <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                          Thêm tag
                        </Button>
                      </Space>
                    </>
                  )}
                  options={tagList.map((item) => ({ label: item.title, value: item.id }))}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="content" rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}>
                <RichInput value={content} onChange={(v) => setContent(v)} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item className="flex justify-center">
                <Button type="primary" size="large" htmlType="submit" style={{ width: "400px" }}>
                  Lưu bài viết
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default EditPost;
