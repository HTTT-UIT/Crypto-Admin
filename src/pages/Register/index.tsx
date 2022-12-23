import { UserOutlined, LockTwoTone } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";
import logo from "../../assets/images/Logo.png";
import authApi from "@/api/authApi";

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onSubmit = ({ username, password, repassword }) => {
    if (password != repassword) {
      message.success("Nhập lại mật khẩu");
    }
    try {
      authApi.register({ userName: username, password: password });
      navigate("/login");
    } catch (error) {
      message.error(error);
      message.error("Đã xảy ra lỗi");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Row justify="center">
          <Col xs={20} sm={20} md={12} lg={12}>
            <Card>
              <div style={{ margin: "1.5rem 0" }}>
                <div style={{ textAlign: "center" }}>
                  <img src={logo} style={{ height: "5rem" }} />
                  <p>Đăng ký tài khoản</p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form
                      id="register-form"
                      layout="vertical"
                      onFinish={onSubmit}
                      form={form}
                      initialValues={{ remember: true }}>
                      <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[{ required: true, message: "Đây là trường bắt buộc!" }]}>
                        <Input placeholder="Username" prefix={<UserOutlined style={{ color: "#3e79f7" }} />} />
                      </Form.Item>
                      <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                          { required: true, message: "Đây là trường bắt buộc!" },
                          //   { min: 6, message: "Mật khẩu phải có độ dài từ 6 ký tự" },
                        ]}>
                        <Input.Password placeholder="******" prefix={<LockTwoTone />} />
                      </Form.Item>
                      <Form.Item
                        label="Nhập lại mật khẩu"
                        name="repassword"
                        rules={[
                          { required: true, message: "Đây là trường bắt buộc!" },
                          //   { min: 6, message: "Mật khẩu phải có độ dài từ 6 ký tự" },
                        ]}>
                        <Input.Password placeholder="******" prefix={<LockTwoTone />} />
                      </Form.Item>
                      <Form.Item>
                        <Button size="large" type="primary" htmlType="submit" block={true}>
                          Đăng ký
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Register;
