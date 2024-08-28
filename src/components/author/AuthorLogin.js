import React from 'react';
import AuthForm from '../auth/AuthForm';

const AuthorLogin = () => {
    return (
        <AuthForm
            mode="login"
            apiEndpoint="http://localhost:8000/api/auth/authorLogin"
            redirectPath="/author/authorDashBoard"
            otherPath="/author/authorRegister"
            linkText="Register"
        />
    );
};

export default AuthorLogin;
