import React, { useState } from "react";
import NextLink from "next/link";
import { Button, Input, Form } from "antd";
import { SIGN_IN } from "../../utils/routes";

const ResetPassword = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      // @TODO: Auth logic
      // if (res.error) alert(res.error);
    } catch (error) {
      // alert(error.message);
    } finally {
      // setIsAfterSubmit(true);
      setLoading(false);
    }
  };

  return (
    <div>
      {success ? (
        <div>
          Bitte schauen Sie Ihr E-Mail Postfach. Wir haben Ihnen eine E-Mail zum
          Zurücksetzen des Passworts geschickt. Wenn Sie innerhalb von zehn Minuten keine
          E-Mail erhalten, überprüfen Sie, ob die angegebene E-Mail korrekt ist.
        </div>
      ) : (
        <div>
          <Form layout='vertical' onFinish={handleClick}>
            <Form.Item label='Email'>
              <Input
                placeholder='info@lfca.earth'
              />
            </Form.Item>
            <Form.Item>
              <Button block loading={loading} type='primary' onClick={handleClick}>
                Passwort zurücksetzen
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
      <NextLink href={SIGN_IN}>Zurück zum Login</NextLink>
    </div>
  );
};

export default ResetPassword;
