import { useState } from "react";
import { supabase } from "../../services/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Input, Form, Space, Alert } from "antd";
import { SIGN_UP, PW_RESET, HOME } from "../../utils/routes";

export default function Signin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (email, password) => {
    setLoading(true);
    try {
      const { session, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      router.push({ pathname: HOME, hash: session?.access_token });
    } catch (e) {
      console.log(e.message);
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    let { email, password } = { ...values };
    setErrorMessage("");
    handleSignIn(email, password);
  };

  return (
    <div>
      <Form layout="vertical" onFinish={onFinish}>
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

        {errorMessage && <Alert showIcon message={errorMessage} type="error" />}
        <Form.Item>
          <Button type="primary" block loading={loading} htmlType="submit">
            Anmelden
          </Button>
        </Form.Item>
      </Form>
      <Space>
        <Link href={PW_RESET}>Passwort vergessen</Link>
        <Link href={SIGN_UP}>Noch nicht registriert? Anmelden</Link>
      </Space>
    </div>
  );
}
