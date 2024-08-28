import React from 'react';
import { Button, Box, Typography, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import book from "../../assets/images/reader.webp"

const ReaderDashboard = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 5, display: 'flex' }}>
            {/* Left Side Image */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    src={book}
                    alt="Reader"
                    style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                />
            </Box>

            {/* Right Side with Text and Buttons */}
            <Box
                sx={{
                    flex: 1,
                    ml: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Center items horizontally
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Reader Dashboard
                </Typography>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            size="large" // Increase the size of the buttons
                            fullWidth
                            onClick={() => handleNavigation('/reader/top-rated')}
                        >
                            View Top Rated Books
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            size="large" // Increase the size of the buttons
                            fullWidth
                            onClick={() => handleNavigation('/reader/authors')}
                        >
                            Browse by Author
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            size="large" // Increase the size of the buttons
                            fullWidth
                            onClick={() => handleNavigation('/reader/genres')}
                        >
                            Browse by Genre
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            size="large" // Increase the size of the buttons
                            fullWidth
                            onClick={() => handleNavigation('/reader/reviews')}
                        >
                            My Reviews
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ReaderDashboard;
