import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';

const headingTranslations = {
  en: 'Frequently Asked Questions',
  hi: 'अक्सर पूछे जाने वाले प्रश्न',
  bn: 'সচরাচর জিজ্ঞাসা করা প্রশ্নগুলি',
  te: 'తరచుగా అడిగే ప్రశ్నలు',
  ta: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
  mr: 'वारंवार विचारले जाणारे प्रश्न',
  kn: 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು'
};

const TranslatableHeading = ({ language }) => {
  const [loading, setLoading] = useState(true);
  const [heading, setHeading] = useState('');

  useEffect(() => {
    setLoading(true);
    // Simulate translation loading time
    setTimeout(() => {
      setHeading(headingTranslations[language] || headingTranslations.en);
      setLoading(false);
    }, 500);
  }, [language]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      {loading ? (
        <CircularProgress size={24} sx={{ mr: 2 }} />
      ) : (
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          {heading}
        </Typography>
      )}
    </Box>
  );
};

export default TranslatableHeading;