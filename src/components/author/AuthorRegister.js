import React from 'react';
import AuthForm from '../auth/AuthForm';

const AuthorRegister = () => {
    return (
        <AuthForm
            mode="register"
            apiEndpoint="http://localhost:8000/api/auth/authorRegister"
            redirectPath="/author/authorLogin"
            otherPath="/author/authorLogin"
            linkText="Login"
        />
    );
};

export default AuthorRegister;
