import React from 'react';
import AuthForm from '../auth/AuthForm';

const ReaderLogin = () => {
    return (
        <AuthForm
            mode="login"
            apiEndpoint="http://localhost:8000/api/reader/readerLogin"
            redirectPath="/reader/readerDashBoard"
            otherPath="/reader/readerRegister"
            linkText="Register"
        />
    );
};

export default ReaderLogin;
