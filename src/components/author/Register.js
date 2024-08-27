import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to the server
        console.log(formData);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Box
                sx={{
                    boxShadow: 3,
                    p: 4,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Registration Form
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        type="email"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        type="password"
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, py: 1.5 }}
                    >
                        Register
                    </Button>
                </Box>
                <Typography align="center" sx={{ mt: 2 }}>
                    Already have an account?{' '}
                    <Link href="/login" underline="hover">
                        Login
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Register;
