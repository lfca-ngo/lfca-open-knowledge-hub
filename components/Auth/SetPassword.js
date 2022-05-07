import React, { useState } from "react";
import { supabase } from "../../services/supabaseClient";
import NextLink from "next/link";
import { Button, Input, Form } from "antd";
import { useSession } from "../../utils/userContext";
import { HOME } from "../../utils/routes";

const SetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [passwordA, setPasswordA] = useState("");
  const [passwordB, setPasswordB] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAfterSubmit, setIsAfterSubmit] = useState(false);

  const { session } = useSession();

  const handleClick = async () => {
    if (!passwordA || !passwordB) {
      setErrorMessage("Bitte füllen Sie alle Felder aus");
      return;
    }
    if (passwordA !== passwordB) {
      setErrorMessage(
        "Passwörter stimmen nicht überein, bitte versuchen Sie es erneut"
      );
      return;
    }
    if (!session) {
      setErrorMessage(
        "Es ist etwas schief gelaufen, bitte versuchen Sie es erneut"
      );
      return;
    }
    setLoading(true);
    const newPassword = passwordA;
    try {
      const { error } = await supabase.auth.api.updateUser(
        session.access_token,
        {
          password: newPassword,
        }
      );
      if (error) {
        setErrorMessage(error.message);
        return;
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }

    setIsAfterSubmit(true);
  };

  return (
    <div>
      {isAfterSubmit ? (
        <div>
          Ihr neues Passwort wurde gespeichert.
          <NextLink href={HOME}>Zum Dashboard</NextLink>
        </div>
      ) : (
        <Form layout="vertical">
          <Form.Item label="Passwort">
            <Input
              placeholder="******"
              type="password"
              value={passwordA}
              onChange={(e) => setPasswordA(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Passwort wiederholen">
            <Input
              placeholder="******"
              type="password"
              value={passwordB}
              onChange={(e) => setPasswordB(e.target.value)}
            />
          </Form.Item>
          {errorMessage}
          <Button loading={loading} type="primary" block onClick={handleClick}>
            Neues Passwort setzen
          </Button>
        </Form>
      )}
    </div>
  );
};

export default SetPassword;
