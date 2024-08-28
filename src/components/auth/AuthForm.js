import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ mode, apiEndpoint, redirectPath, otherPath, linkText }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const schema = z.object({
        name: mode === 'register' ? z.string().min(1, { message: "Name is required" }) : z.string().optional(),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = schema.safeParse(formData);

        if (!result.success) {
            const zodErrors = result.error.errors.reduce((acc, error) => {
                acc[error.path[0]] = error.message;
                return acc;
            }, {});
            setErrors(zodErrors);
            toast.error("Please correct the errors in the form.");
        } else {
            setErrors({});
            try {
                const response = await fetch(apiEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (response.ok) {
                    const token = data.token;
                    if (token) localStorage.setItem('authToken', token);

                    toast.success(`${mode === 'register' ? 'Registration' : 'Login'} successful!`);
                    setFormData({
                        name: '',
                        email: '',
                        password: '',
                    });
                    navigate(redirectPath);
                } else {
                    toast.error(data.message || "An error occurred.");
                }
            } catch (error) {
                toast.error("Network error, please try again later.");
            }
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Toaster position="top-center" reverseOrder={false} />
            <Box
                sx={{
                    boxShadow: 3,
                    p: 4,
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    {mode === 'register' ? 'Registration Form' : 'Login Form'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    {mode === 'register' && (
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            margin="normal"
                            variant="outlined"
                            required
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    )}
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
                        error={!!errors.email}
                        helperText={errors.email}
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
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, py: 1.5 }}
                    >
                        {mode === 'register' ? 'Register' : 'Login'}
                    </Button>
                </Box>
                <Typography align="center" sx={{ mt: 2 }}>
                    {mode === 'register' ? 'Already have an account?' : "Don't have an account? "}
                    <Link href={otherPath} underline="hover">
                        {linkText}
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default AuthForm;
