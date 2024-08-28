import React, { useState } from 'react';
import {
    TextField, Button, Container, Typography, Box, MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

// Define the Zod schema
const bookSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    publishDate: z.string().min(1, { message: "Publish Date is required" }),
    price: z.number().min(0, { message: "Price must be a positive number" }),
    tags: z.string().optional(),
    status: z.enum(["draft", "published"]),
    cover: z.custom((file) => file instanceof File, {
        message: "Cover image is required",
    }),
});

const AddBookForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        publishDate: '',
        price: '',
        tags: '',
        status: 'draft',
    });
    const [cover, setCover] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setCover(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data using Zod
        const parsedData = bookSchema.safeParse({
            ...formData,
            price: Number(formData.price), // Convert price to number for validation
            cover,
        });

        if (!parsedData.success) {
            // Collect all validation errors
            const zodErrors = parsedData.error.errors.reduce((acc, error) => {
                acc[error.path[0]] = error.message;
                return acc;
            }, {});
            setErrors(zodErrors);
            toast.error("Please correct the errors in the form.");
            return;
        }

        setErrors({}); // Clear previous errors

        const formDataToSend = new FormData();
        formDataToSend.append('cover', cover);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('publishDate', formData.publishDate);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('tags', formData.tags.split(',').map(tag => tag.trim()));
        formDataToSend.append('status', formData.status);

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8000/api/book/addAuthorBook', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formDataToSend,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Book added successfully!');
                navigate('/author/authorDashBoard');
            } else {
                toast.error(data.message || 'Failed to add book');
            }
        } catch (error) {
            toast.error('Network error, please try again later.');
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
                    Add New Book
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                    <TextField
                        fullWidth
                        label="Publish Date"
                        name="publishDate"
                        value={formData.publishDate}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        error={!!errors.publishDate}
                        helperText={errors.publishDate}
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        type="number"
                        required
                        error={!!errors.price}
                        helperText={errors.price}
                    />
                    <TextField
                        fullWidth
                        label="Tags (comma separated)"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        error={!!errors.tags}
                        helperText={errors.tags}
                    />
                    <FormControl fullWidth margin="normal" error={!!errors.status}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        >
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="published">Published</MenuItem>
                        </Select>
                        {errors.status && <Typography variant="body2" color="error">{errors.status}</Typography>}
                    </FormControl>
                    <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        sx={{ mt: 2, py: 1.5 }}
                        error={!!errors.cover}
                        helperText={errors.cover}
                    >
                        Upload Cover Image
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {errors.cover && <Typography variant="body2" color="error">{errors.cover}</Typography>}
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, py: 1.5 }}
                    >
                        Add Book
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AddBookForm;
