import { Button } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { SIGN_IN } from "../../utils/routes";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    try {
      // await supabase.auth.signOut();
      // await fetch(API_AUTH_REMOVE, {
      //   method: "GET",
      //   credentials: "same-origin",
      // });
    } finally {
      setLoading(false);
      router.push(SIGN_IN);
    }
  };
  return (
    <Button loading={loading} onClick={handleClick}>
      Logout
    </Button>
  );
};

export default Logout;
