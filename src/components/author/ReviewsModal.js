import React from 'react';
import { Modal, Box, Typography, IconButton, List, ListItem, Divider, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ReviewsModal = ({ open, onClose, reviews }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="reviews-modal-title"
            aria-describedby="reviews-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    overflowY: 'auto'
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography id="reviews-modal-title" variant="h6" component="h2">
                        Reviews
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        mt: 2,
                        maxHeight: 400,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {reviews.length === 0 ? (
                        <Typography>No reviews available.</Typography>
                    ) : (
                        <List>
                            {reviews.map((review) => (
                                <React.Fragment key={review._id}>
                                    <ListItem
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mb: 2,
                                            p: 2,
                                            borderRadius: 1,
                                            boxShadow: 1,
                                            bgcolor: 'background.default'
                                        }}
                                    >
                                        <Avatar
                                            sx={{ mr: 2 }}
                                        />
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                {review?.reader?.name || 'Name not found    '}
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {review.message}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                Rating: {review.rating}/5
                                            </Typography>
                                        </Box>
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export default ReviewsModal;
