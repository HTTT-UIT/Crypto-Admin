import { UserOutlined, LockTwoTone } from "@ant-design/icons";
import { Alert, Button, Card, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.less";
import logo from "../../assets/images/Logo.png";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";

const Login = () => {
  const [form] = Form.useForm();
  //   const navigate = useNavigate();
  //   const dispatch = useAppDispatch();
  //   const [loading, setLoading] = useState(false);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Row justify="center">
          <Col xs={20} sm={20} md={12} lg={12}>
            <Card>
              <div style={{ margin: "1.5rem 0" }}>
                <div style={{ textAlign: "center" }}>
                  <img src={logo} style={{ height: "5rem" }} />
                  <p>Crypto Admin</p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <div
                    //  style={{ opacity: `${isFailed}` }}
                    >
                      <Alert message={"failedMessage"} type="error" showIcon />
                    </div>
                    <Form
                      id="login-form"
                      layout="vertical"
                      //   onFinish={login}
                      //   onFinishFailed={noticeFailed}
                      form={form}
                      initialValues={{
                        remember: true,
                      }}>
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}>
                        <Input placeholder="Username" prefix={<UserOutlined style={{ color: "#3e79f7" }} />} />
                      </Form.Item>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          { required: true, message: "Please input your password!" },
                          { min: 6, message: "Password must be minimum 6 characters." },
                        ]}>
                        <Input.Password placeholder="Password" prefix={<LockTwoTone />} />
                      </Form.Item>
                      <Form.Item>
                        <Link to={`/forgot-password`}>
                          <Button className={styles.btn} type="link">
                            Forgot password?
                          </Button>
                        </Link>
                      </Form.Item>
                      <Form.Item>
                        <Button size="large" type="primary" htmlType="submit" block={true}>
                          Sign In
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

export default Login;
