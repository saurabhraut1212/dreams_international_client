import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Pagination, Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const GetAllBooks = () => {
    const { authorId } = useParams();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const pageSize = 10;

    const fetchBooks = async (page = 1) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8000/api/book/getBooksByAuthor/${authorId}?page=${page}&limit=${pageSize}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();

            console.log(data, "this is book in all books");
            if (response.ok) {
                setBooks(data.books);
                setCurrentPage(data.pagination.currentPage);
                setTotalPages(data.pagination.totalPages);
            } else {
                toast.error(data.message || 'Failed to fetch books');
            }
        } catch (error) {
            toast.error('Network error, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks(currentPage);
    }, [currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleEdit = (bookId) => {
        navigate(`/author/editBook/${bookId}`);
    };

    const handleDelete = async (bookId) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`http://localhost:8000/api/book/deleteBook/${bookId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success('Book deleted successfully');
                fetchBooks(currentPage);
            } else {
                const data = await response.json();
                toast.error(data.message || 'Failed to delete book');
            }
        } catch (error) {
            toast.error('Network error, please try again later.');
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Toaster position="top-center" reverseOrder={false} />
            <Typography variant="h4" align="center" gutterBottom>
                Books by Author
            </Typography>
            {loading ? (
                <Typography variant="h6" align="center">
                    Loading...
                </Typography>
            ) : (
                <Box>
                    <Grid container spacing={3}>
                        {books.map((book) => (
                            <Grid item xs={12} sm={6} md={4} key={book._id}>
                                <Box
                                    sx={{
                                        boxShadow: 3,
                                        p: 3,
                                        borderRadius: 2,
                                        backgroundColor: 'background.paper',
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%'
                                    }}
                                >
                                    <img
                                        src={book.coverImageUrl}
                                        alt={book.title}
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            maxHeight: '300px',
                                            objectFit: 'cover',
                                            borderRadius: '10px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <Typography variant="h6">{book.title}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {book.description}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Price: ${book.price}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        Published: {book.publishDate}
                                    </Typography>
                                    <Box
                                        sx={{
                                            mt: 'auto',
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleEdit(book._id)}
                                            sx={{ width: '48%' }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDelete(book._id)}
                                            sx={{ width: '48%' }}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default GetAllBooks;
