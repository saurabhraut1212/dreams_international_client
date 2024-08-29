import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Pagination, Button, TextField, Select, MenuItem, FormControl, InputLabel, IconButton, Chip } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReviewsModal from './ReviewsModal';

const GetAllBooks = () => {
    const { authorId } = useParams();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchTitle, setSearchTitle] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortByDate, setSortByDate] = useState('');
    const [sortByRating, setSortByRating] = useState('');
    const [selectedBookReviews, setSelectedBookReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openReviewsModal = (reviews) => {
        setSelectedBookReviews(reviews);
        setIsModalOpen(true);
    };

    const closeReviewsModal = () => {
        setIsModalOpen(false);
        setSelectedBookReviews([]);
    };

    const pageSize = 10;

    const fetchBooks = async (page = 1) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const queryParams = new URLSearchParams({
                page: page,
                limit: pageSize,
                search: searchTitle,
                status: filterStatus,
                sortByDate,
                sortByRating
            }).toString();

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/book/getBooksByAuthor/${authorId}?${queryParams}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log(data, "res")

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
    }, [currentPage, searchTitle, filterStatus, sortByDate, sortByRating]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleEdit = (bookId) => {
        navigate(`/author/editBook/${bookId}`);
    };

    const handleDelete = async (bookId) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/book/deleteAuthorBook/${bookId}`, {
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

    const handleResetFilters = () => {
        setSearchTitle('');
        setFilterStatus('');
        setSortByDate('');
        setSortByRating('');
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Toaster position="top-center" reverseOrder={false} />

            <Typography variant="h4" align="center" gutterBottom>
                Books by Author
            </Typography>

            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <TextField
                    label="Search by Title"
                    variant="outlined"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    sx={{ width: '30%' }}
                />
                <FormControl sx={{ width: '20%' }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        label="Status"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="published">Published</MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ width: '20%' }}>
                    <InputLabel>Published Date</InputLabel>
                    <Select
                        value={sortByDate}
                        onChange={(e) => setSortByDate(e.target.value)}
                        label="Sort By"
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="asc">Ascending</MenuItem>
                        <MenuItem value="desc">Descending</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ width: '20%' }}>
                    <InputLabel>Ratings</InputLabel>
                    <Select
                        value={sortByRating}
                        onChange={(e) => setSortByRating(e.target.value)}
                        label="Sort By"
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="asc">Low to High</MenuItem>
                        <MenuItem value="desc">High to Low</MenuItem>
                    </Select>
                </FormControl>
                <IconButton color="secondary" onClick={handleResetFilters}>
                    <RefreshIcon />
                </IconButton>
            </Box>

            {loading ? (
                <Typography variant="h6" align="center">
                    Loading...
                </Typography>
            ) : (
                books.length > 0 ? (
                    <Box>
                        <Grid container spacing={3}>
                            {books.map((book) => (
                                <Grid item xs={12} sm={6} md={4} key={book._id} sx={{ mb: 8 }}>
                                    <Box
                                        sx={{
                                            boxShadow: 3,
                                            p: 3,
                                            borderRadius: 2,
                                            backgroundColor: 'background.paper',
                                            position: 'relative',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: '100%',
                                            mb: 2
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: 300,
                                                overflow: 'hidden',
                                                borderRadius: '10px',
                                                mb: 2
                                            }}
                                        >
                                            <img
                                                src={book.coverImageUrl}
                                                alt={book.title}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </Box>
                                        <Typography variant="h6">{book.title}</Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                            {book.description}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                            Price: ${book.price}
                                        </Typography>
                                        <Box display="flex" alignItems="center" justifyContent={'space-between'} gap={2}>
                                            <Typography variant="caption" color="textSecondary">
                                                Published: {book.publishDate ? new Date(book.publishDate).toISOString().split('T')[0] : 'Unknown'}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                Status: <Chip label={book.status} sx={{
                                                    backgroundColor: book.status === 'published' ? '#4caf50' : '#f44336'
                                                }} />
                                            </Typography>
                                        </Box>
                                        <Typography variant="subtitle2">
                                            Ratings: {book.averageRating === 0 ? 'No ratings' : `${book.averageRating}/5`}
                                        </Typography>

                                        <Box
                                            sx={{
                                                my: 'auto',
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
                                        <Box
                                            sx={{
                                                my: 'auto',
                                            }}
                                        >
                                            <Button
                                                disabled={book?.reviews?.length === 0}
                                                variant="contained"
                                                color="success"
                                                sx={{ width: '100%' }}
                                                onClick={() => openReviewsModal(book?.reviews)}
                                            >
                                                See Reviews
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
                ) : (
                    <Typography variant="h4" align="center">
                        No Books Found
                    </Typography>
                )
            )}
            <ReviewsModal
                open={isModalOpen}
                onClose={closeReviewsModal}
                reviews={selectedBookReviews}
            />
        </Container>
    );
};

export default GetAllBooks;
