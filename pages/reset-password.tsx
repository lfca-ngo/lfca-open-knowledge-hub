import React from "react";
import ResetPassword from "../components/Auth/ResetPassword";
import { OneColLayout } from "../components/Layout";
import type { NextPage } from 'next'

const ResetPasswordPage: NextPage = () => {
    return (
        <OneColLayout>
            <ResetPassword />
        </OneColLayout>
    );
};

export default ResetPasswordPage;
