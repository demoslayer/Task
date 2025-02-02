
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const faqRoutes = require('./routes/faqRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', faqRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 8000;

app.get('/',(req,res)=>{
    res.send("SERVER is running good!!!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;