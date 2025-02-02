

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
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import FAQForm from './FAQForm';
import TranslatableHeading from './TranslatableHeading';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'te', name: 'Telugu' },
  { code: 'ta', name: 'Tamil' },
  { code: 'mr', name: 'Marathi' },
  { code: 'kn', name: 'Kannada' }
];

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [openForm, setOpenForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/faqs?lang=${selectedLanguage}`);
      if (response.data && response.data.data) {
        setFaqs(response.data.data);
      }
      setError('');
    } catch (error) {
      setError('Error fetching FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, [selectedLanguage]);

  return (
    <Box sx={{ p: 3 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
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
              key={faq.id}
              expanded={expanded === faq.id}
              onChange={() => setExpanded(expanded === faq.id ? false : faq.id)}
              sx={{ mb: 1 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{faq.question}</Typography>
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
      />
    </Box>
  );
};

export default FAQList;