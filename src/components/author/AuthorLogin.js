import React from 'react';
import AuthForm from '../auth/AuthForm';

const AuthorLogin = () => {
    console.log(process.env.REACT_APP_BASE_URL, "url")
    return (
        <AuthForm
            mode="login"
            apiEndpoint={`${process.env.REACT_APP_BASE_URL}/api/auth/authorLogin`}
            redirectPath="/author/authorDashBoard"
            otherPath="/author/authorRegister"
            linkText="Register"
        />
    );
};

export default AuthorLogin;
