import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Pagination, Button, FormControl, InputLabel, Select, MenuItem, IconButton, TextField, Chip } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReviewsModal from '../author/ReviewsModal';
import AddReviewModal from './AddReviewModal'; // Import the new modal

const GetTopRatedBooks = () => {
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
    const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isReviewFormModalOpen, setIsReviewFormModalOpen] = useState(false);

    const openReviewsModal = (reviews) => {
        setSelectedBookReviews(reviews);
        setIsReviewsModalOpen(true);
    };

    const closeReviewsModal = () => {
        setIsReviewsModalOpen(false);
        setSelectedBookReviews([]);
    };

    const openReviewForm = (book) => {
        setSelectedBook(book);
        setIsReviewFormModalOpen(true);
    };

    const closeReviewFormModal = () => {
        setIsReviewFormModalOpen(false);
        setSelectedBook(null);
    };

    const handleReviewSubmit = async (rating, message) => {
        try {
            const token = localStorage.getItem('readerToken');
            const response = await fetch('http://localhost:8000/api/reader/addReview', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    rating,
                    message,
                    bookId: selectedBook._id
                })
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Review added successfully');
                fetchTopRatedBooks(currentPage);
                closeReviewFormModal();
            } else {
                toast.error(data.message || 'Failed to add review');
            }
        } catch (error) {
            toast.error('Network error, please try again later.');
        }
    };

    const pageSize = 10;

    const fetchTopRatedBooks = async (page = 1) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('readerToken');
            const queryParams = new URLSearchParams({
                page: page,
                limit: pageSize,
                search: searchTitle,
                status: filterStatus,
                sortByDate,
                sortByRating
            }).toString();

            const response = await fetch(`http://localhost:8000/api/reader/topRatedBooks?${queryParams}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setBooks(data.books);
                setCurrentPage(data.pagination.currentPage);
                setTotalPages(data.pagination.totalPages);
            } else {
                toast.error(data.message || 'Failed to fetch top-rated books');
            }
        } catch (error) {
            toast.error('Network error, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopRatedBooks(currentPage);
    }, [currentPage, searchTitle, filterStatus, sortByDate, sortByRating]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
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
                Top Rated Books
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
                books.length > 0 ?
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
                                                sx={{ width: '45%' }}
                                                onClick={() => openReviewForm(book)}
                                            >
                                                Add Review
                                            </Button>
                                            <Button
                                                disabled={book?.reviews?.length === 0}
                                                variant="contained"
                                                sx={{ width: '45%' }}
                                                onClick={() => openReviewsModal(book.reviews)}
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
                    : (
                        <Typography variant="h6" align="center">
                            No books found.
                        </Typography>
                    )
            )}

            <AddReviewModal
                open={isReviewFormModalOpen}
                onClose={closeReviewFormModal}
                onSubmit={handleReviewSubmit}
                bookTitle={selectedBook?.title}
            />

            <ReviewsModal
                open={isReviewsModalOpen}
                reviews={selectedBookReviews}
                onClose={closeReviewsModal}
            />
        </Container>
    );
};

export default GetTopRatedBooks;
