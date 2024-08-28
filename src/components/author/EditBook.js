import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { format, parse } from 'date-fns';

const EditBook = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({});
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        publishDate: '',
        price: '',
        tags: '',
        status: 'draft',
    });
    const [coverImage, setCoverImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`http://localhost:8000/api/book/getBook/${bookId}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setBook(data.book);
                    const formattedDate = format(new Date(data.book.publishDate), 'dd-MM-yyyy');
                    setFormData({
                        title: data.book.title,
                        description: data.book.description,
                        publishDate: formattedDate,
                        price: data.book.price,
                        tags: data.book.tags.join(', '),
                        status: data.book.status
                    });
                } else {
                    toast.error(data.message || 'Failed to fetch book');
                }
            } catch (error) {
                toast.error('Network error, please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [bookId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (event) => {
        setCoverImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const publishDate = parse(formData.publishDate, 'dd-MM-yyyy', new Date()).toISOString().split('T')[0];

        const errors = {};
        if (!formData.title) errors.title = "Title is required";
        if (!formData.description) errors.description = "Description is required";
        if (!formData.publishDate) errors.publishDate = "Publish Date is required";
        if (Number(formData.price) <= 0) errors.price = "Price must be a positive number";
        if (!formData.status) errors.status = "Status is required";
        if (coverImage === null) errors.cover = "Cover image is required";

        if (Object.keys(errors).length) {
            setErrors(errors);
            toast.error("Please correct the errors in the form.");
            return;
        }

        setErrors({});

        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('publishDate', publishDate);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('tags', formData.tags.split(',').map(tag => tag.trim()));
        formDataToSend.append('status', formData.status);
        if (coverImage) {
            formDataToSend.append('cover', coverImage);
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8000/api/book/updateAuthorBook/${bookId}`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formDataToSend
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Book updated successfully');
                navigate('/author/authorDashBoard');
            } else {
                toast.error(data.message || 'Failed to update book');
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
                    Edit Book
                </Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center" sx={{ mt: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                            type="text"
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
                        <Button variant="contained" component="label" fullWidth sx={{ mt: 2, py: 1.5 }} error={!!errors.cover}>
                            Upload Cover Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {errors.cover && <Typography variant="body2" color="error">{errors.cover}</Typography>}
                        </Button>
                        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, py: 1.5 }}>
                            Save Changes
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default EditBook;
