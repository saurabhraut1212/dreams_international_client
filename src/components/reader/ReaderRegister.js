import React from 'react';
import AuthForm from '../auth/AuthForm';

const ReaderRegister = () => {
    return (
        <AuthForm
            mode="register"
            apiEndpoint={`${process.env.REACT_APP_BASE_URL}/api/reader/readerRegister`}
            redirectPath="/reader/readerLogin"
            otherPath="/reader/readerLogin"
            linkText="Login"
        />
    );
};

export default ReaderRegister;
