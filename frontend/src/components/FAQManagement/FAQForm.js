


import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

const FAQForm = ({ open, onClose, refreshFAQs }) => {
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/api/faqs', {
        question: formData.question,
        answer: formData.answer
      });
      
      setFormData({ question: '', answer: '' });
      onClose();
      refreshFAQs();
    } catch (error) {
      setError(error.response?.data?.error || 'Error creating FAQ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New FAQ (English)</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Question"
            value={formData.question}
            onChange={(e) => setFormData({ ...formData, question: e.target.value })}
            margin="normal"
            required
            disabled={loading}
          />
          <TextField
            fullWidth
            label="Answer"
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            margin="normal"
            required
            multiline
            rows={4}
            disabled={loading}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Create FAQ'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FAQForm;