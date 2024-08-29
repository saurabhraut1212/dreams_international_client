import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';

const AddReviewModal = ({ open, onClose, onSubmit, bookTitle }) => {
    const [rating, setRating] = useState(0);
    const [reviewMessage, setReviewMessage] = useState('');

    const handleSubmit = () => {
        onSubmit(rating, reviewMessage);
        setRating(0);
        setReviewMessage('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Review for {bookTitle}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Rating"
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    sx={{ width: '100%', mt: 2 }}
                />
                <TextField
                    label="Message"
                    multiline
                    rows={4}
                    value={reviewMessage}
                    onChange={(e) => setReviewMessage(e.target.value)}
                    sx={{ width: '100%', mt: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Submit Review
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddReviewModal;
