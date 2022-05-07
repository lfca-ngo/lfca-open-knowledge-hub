import React, { useState } from "react";
import NextLink from "next/link";
import { supabase } from "../../services/supabaseClient";
import { Button, Input, Form } from "antd";
import { SIGN_IN } from "../../utils/routes";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAfterSubmit, setIsAfterSubmit] = useState(false);

  const handleClick = async () => {
    setErrorMessage("");
    setLoading(true);
    try {
      let { data } = await supabase.from("profiles").select("email").eq("email", email);

      if (!data.length) {
        setErrorMessage("E-Mail ist nicht vorhanden, bitte versuchen Sie es erneut");
        return;
      }
      let res = await supabase.auth.api.resetPasswordForEmail(email);
      if (res.error) alert(res.error);
    } catch (error) {
      alert(error.message);
    } finally {
      // setIsAfterSubmit(true);
      setLoading(false);
    }
  };

  return (
    <div>
      {isAfterSubmit ? (
        <div>
          Bitte schauen Sie Ihr E-Mail Postfach. Wir haben Ihnen eine E-Mail zum
          Zurücksetzen des Passworts geschickt. Wenn Sie innerhalb von zehn Minuten keine
          E-Mail erhalten, überprüfen Sie, ob die angegebene E-Mail korrekt ist.
        </div>
      ) : (
        <div>
          <Form layout='vertical'>
            <Form.Item label='Email'>
              <Input
                value={email}
                placeholder='prenzl@media.de'
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            {errorMessage}
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
