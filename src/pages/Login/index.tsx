import { UserOutlined, LockTwoTone } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.less";
import logo from "../../assets/images/Logo.png";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { authAction } from "@/store/reducers/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { userAction } from "@/store/reducers/userSlice";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ username, password }) => {
    setLoading(true);
    try {
      const result = await dispatch(authAction.login({ userName: username, password }));
      await unwrapResult(result);

      const decoded = jwt_decode(result?.payload?.token);
      //@ts-ignore
      const user = await dispatch(userAction.getUser(decoded?.primarysid));
      await unwrapResult(user);

      message.success("Đăng nhập thành công!");
      navigate("/posts", { replace: true });
    } catch (error: any) {
      message.error(error?.message);
    }
    setLoading(false);
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
                  <p>Đăng nhập</p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form
                      id="login-form"
                      layout="vertical"
                      onFinish={onSubmit}
                      form={form}
                      initialValues={{
                        remember: true,
                      }}>
                      <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[{ required: true, message: "Nhập tên đăng nhập!" }]}>
                        <Input placeholder="Username" prefix={<UserOutlined style={{ color: "#3e79f7" }} />} />
                      </Form.Item>
                      <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                          { required: true, message: "Nhập mật khẩu!" },
                          //   { min: 6, message: "Password must be minimum 6 characters." },
                        ]}>
                        <Input.Password placeholder="******" prefix={<LockTwoTone />} />
                      </Form.Item>
                      <Form.Item>
                        <Link to={`/forgot-password`}>
                          <Button className={styles.btn} type="link">
                            Quên mật khẩu?
                          </Button>
                        </Link>
                      </Form.Item>
                      <Form.Item>
                        <Button size="large" type="primary" htmlType="submit" block={true} loading={loading}>
                          Đăng nhập
                        </Button>
                      </Form.Item>
                    </Form>
                    <Link to="/register">
                      <Button size="large" block={true}>
                        Đăng ký
                      </Button>
                    </Link>
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
