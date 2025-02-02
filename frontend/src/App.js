import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { CssBaseline, AppBar, Toolbar, Typography, Container } from '@mui/material';
import FAQList from './components/FAQManagement/FAQList';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            FAQ Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <FAQList />
      </Container>
    </ThemeProvider>
  );
}

export default App;