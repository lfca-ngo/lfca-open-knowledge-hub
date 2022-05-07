import React from "react";
import Signup from "../components/Auth/Signup";
import { OneColLayout } from "../components/Layout";
import type { NextPage } from 'next'

const SignUp: NextPage = () => {
    return (
        <OneColLayout>
            <Signup />
        </OneColLayout>
    );
};

export default SignUp;
