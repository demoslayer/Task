
 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors');
 const faqRoutes = require('./routes/faqRoutes');
 require('dotenv').config();

 const app = express();

 app.use(cors({
     origin: 'http://localhost:3000', // Precise origin instead of wildcard
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
     exposedHeaders: ['Authorization'],
     credentials: false,
     maxAge: 86400
 }));

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const { createClient } = require('redis'); // Use official Redis client
// require('dotenv').config();

// const app = express();

// // Improved CORS Configuration (Production-Ready)
// app.use(cors({
//     origin: process.env.NODE_ENV === 'production'
//         ? ['https://your-frontend-domain.com'] 
//         : ['http://localhost:3000'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     optionsSuccessStatus: 200
// }));

// // Initialize Redis Client PROPERLY for Cloud
// const redisClient = createClient({
//     url: process.env.REDIS_URL,
//     socket: {
//         tls: true,
//         rejectUnauthorized: false
//     }
// });

// redisClient.on('error', (err) => 
//     console.error('Redis Client Error:', err));

// // Connect to Redis
// (async () => {
//     try {
//         await redisClient.connect();
//         console.log('Connected to Redis Cloud!');
//     } catch (err) {
//         console.error('Redis Connection Failed:', err);
//     }
// })();




app.options('*', cors());
app.use(express.json());

// Routes
app.use('/api', faqRoutes);
app.use(express.urlencoded({ extended: true }));

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

