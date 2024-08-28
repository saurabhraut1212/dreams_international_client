import React from 'react';
import AuthForm from '../auth/AuthForm';

const ReaderRegister = () => {
    return (
        <AuthForm
            mode="register"
            apiEndpoint="http://localhost:8000/api/reader/readerRegister"
            redirectPath="/reader/readerLogin"
            otherPath="/reader/readerLogin"
            linkText="Login"
        />
    );
};

export default ReaderRegister;
