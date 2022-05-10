import type { NextPage } from 'next'
import React from "react";

import Signup from "../components/Auth/Signup";
import { OneColLayout } from "../components/Layout";

const SignUp: NextPage = () => {
    return (
        <OneColLayout>
            <Signup />
        </OneColLayout>
    );
};

export default SignUp;
