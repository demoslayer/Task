



import React, { useState, useEffect } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import FAQForm from './FAQForm';
import TranslatableHeading from './TranslatableHeading';

// const BASE_URL = 'http://localhost:8000';
const BASE_URL = 'https://backend-hazel-mu.vercel.app'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'te', name: 'Telugu' },
  { code: 'ta', name: 'Tamil' },
  { code: 'mr', name: 'Marathi' },
  { code: 'kn', name: 'Kannada' }
];

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
     'Accept': 'application/json'
  }
};

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [openForm, setOpenForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/faqs?lang=${selectedLanguage}`, axiosConfig);
      if (response.data && response.data.data) {
        setFaqs(response.data.data);
      }
      setError('');
    } catch (error) {
      setError('Error fetching FAQs');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, [selectedLanguage]);

  const handleDeleteClick = (event, faqId) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedFaqId(faqId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedFaqId) return;

    try {
      setDeleteLoading(true);
      const response = await axios.delete(`${BASE_URL}/api/faqs/${selectedFaqId}`, axiosConfig);
      
      if (response.data.success) {
        setDeleteDialogOpen(false);
        setSelectedFaqId(null);
        await fetchFAQs();
      } else {
        setError('Failed to delete FAQ');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete FAQ: ' + (error.response?.data?.message || error.message));
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'transparent' }}>
        <TranslatableHeading language={selectedLanguage} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={selectedLanguage}
              label="Language"
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setOpenForm(true)}
          >
            Add New FAQ
          </Button>
        </Box>
      </Paper>

      {loading ? (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {faqs.map((faq) => (
            <Accordion
              key={faq._id}
              expanded={expandedId === faq._id}
              onChange={() => setExpandedId(expandedId === faq._id ? null : faq._id)}
              sx={{ mb: 1 }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  position: 'relative',
                  '& .MuiAccordionSummary-content': {
                    margin: '12px 0',
                  }
                }}
              >
                <Typography>{faq.question}</Typography>
                <IconButton 
                  size="small" 
                  color="error"
                  onClick={(e) => handleDeleteClick(e, faq._id)}
                  sx={{ 
                    position: 'absolute',
                    right: '48px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 0, 0, 0.1)'
                    }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      <FAQForm 
        open={openForm}
        onClose={() => setOpenForm(false)}
        refreshFAQs={fetchFAQs}
        baseUrl={BASE_URL}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedFaqId(null);
        }}
      >
        <DialogTitle>Delete FAQ</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this FAQ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              setDeleteDialogOpen(false);
              setSelectedFaqId(null);
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FAQList;