import React from 'react';
import AuthForm from '../auth/AuthForm';

const ReaderLogin = () => {
    return (
        <AuthForm
            mode="login"
            apiEndpoint={`${process.env.REACT_APP_BASE_URL}/api/reader/readerLogin`}
            redirectPath="/reader/readerDashBoard"
            otherPath="/reader/readerRegister"
            linkText="Register"
        />
    );
};

export default ReaderLogin;
