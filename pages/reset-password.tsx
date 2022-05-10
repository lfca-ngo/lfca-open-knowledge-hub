import type { NextPage } from 'next'
import React from "react";

import ResetPassword from "../components/Auth/ResetPassword";
import { OneColLayout } from "../components/Layout";

const ResetPasswordPage: NextPage = () => {
    return (
        <OneColLayout>
            <ResetPassword />
        </OneColLayout>
    );
};

export default ResetPasswordPage;
