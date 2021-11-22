import { Modal, Form, Button, Input, Checkbox, message } from "antd";
import React, { useRef } from "react";
import { login } from "@/apis/login";

const Login = (props) => {
  const { visible, handleCancel } = props;

  const formRef = useRef();

  const handleLogin = (values) => {
    login({ phone: values.phone, password: values.password }).then((res) => {
      console.log(res);
      message.info(res.message);
    });
  };

  return (
    <div className="login">
      <Modal
        visible={visible}
        title="手机号登录"
        onCancel={handleCancel}
        destroyOnClose
        footer={null}
      >
        <Form
          name="basic"
          ref={formRef}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleLogin}
          initialValues={{ remember: false }}
          autoComplete="off"
          validateTrigger="onBlur"
        >
          <Form.Item
            label="手机号码"
            name="phone"
            rules={[
              { required: true, message: "请输入手机号码" },
              { pattern: /^1[3-9]\d{9}$/, message: "请输入合法的手机号码" },
            ]}
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 16 }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Button
              htmlType="button"
              onClick={handleCancel}
              style={{ marginLeft: "30px" }}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
