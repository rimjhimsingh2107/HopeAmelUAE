import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';


import eventRoutes from './routes/eventRoutes.js';
import donationRoutes from './routes/donationRoutes.js';


dotenv.config();


const app = express();


app.use(morgan('dev')); 
app.use(cors({
  origin: function(origin, callback) {
  
    if (!origin) return callback(null, true);
    
   
    const localhostRegex = /^https?:\/\/localhost(:[0-9]+)?$/;
    
    if (localhostRegex.test(origin)) {
      return callback(null, true);
    } else {
     
      return callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With', 'stripe-signature']
}));


app.use('/api/donations/webhook', express.raw({ type: 'application/json' }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    message: 'Welcome to Hope-Amel UAE API',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});


app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});


app.get('/api/test', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    message: 'API connection successful',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/events', eventRoutes);
app.use('/api/donations', donationRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Cannot find ${req.originalUrl} on this server`
  });
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

startServer();
