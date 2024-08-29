import React from 'react';
import AuthForm from '../auth/AuthForm';

const AuthorRegister = () => {
    return (
        <AuthForm
            mode="register"
            apiEndpoint={`${process.env.REACT_APP_BASE_URL}/api/auth/authorRegister`}
            redirectPath="/author/authorLogin"
            otherPath="/author/authorLogin"
            linkText="Login"
        />
    );
};

export default AuthorRegister;
