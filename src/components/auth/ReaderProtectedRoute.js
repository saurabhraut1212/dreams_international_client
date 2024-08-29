import React from 'react';
import { Navigate } from 'react-router-dom';

const ReaderProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('readerToken');

    if (!token) {
        return <Navigate to="/reader/readerLogin" />;
    }

    return children;
};

export default ReaderProtectedRoute;
