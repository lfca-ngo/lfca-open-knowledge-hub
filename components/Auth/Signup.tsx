import { useState } from "react";
import NextLink from "next/link";
import { Button, Input, Form, Alert } from "antd";
import { SIGN_IN } from "../../utils/routes";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    setLoading(true);

    try {
      // @TODO: Auth logic
      // if (error) throw error;
      setSuccess(true);
    } catch (e) {
      // setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <Form layout="vertical" onFinish={handleSignUp}>
        <Form.Item
          rules={[{ required: true, message: "Please select a company!" }]}
          label={"Unternehmen"}
          name="company"
        >
          <Input placeholder="Company Name" />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "Please input your name!" }]}
          label="Name"
          name="name"
        >
          <Input type="name" placeholder="Heinz Müller" />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "Please input your email!" }]}
          label="Email"
          name="email"
        >
          <Input type="email" placeholder="name@company.de" />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "Please input a password!" }]}
          label="Password"
          name="password"
        >
          <Input.Password placeholder="********" />
        </Form.Item>

        {success && (
          <Alert
            showIcon
            message="Please Check Your Email Confirmation :)"
            type="success"
          />
        )}
        {errorMessage && <Alert showIcon message={errorMessage} type="error" />}

        <Form.Item>
          <Button type="primary" block loading={loading} htmlType="submit">
            Registrieren
          </Button>
        </Form.Item>
      </Form>

      <NextLink href={SIGN_IN}>Schon registriert? Anmelden</NextLink>
    </div>
  );
}
