import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Get started
            </Typography>
            <Box sx={{ mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/author/authorRegister"
                    sx={{ mr: 2 }}
                >
                    Author
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/reader/readerRegister"
                >
                    Reader
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
