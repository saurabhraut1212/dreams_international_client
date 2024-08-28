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
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                Get Started
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/author/authorRegister"
                    sx={{
                        mr: 3,
                        padding: '12px 24px',
                        fontSize: '1.2rem'
                    }}
                >
                    Author
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/reader/readerRegister"
                    sx={{
                        padding: '12px 24px',
                        fontSize: '1.2rem'
                    }}
                >
                    Reader
                </Button>
            </Box>
        </Box>
    );
};

export default Home;
