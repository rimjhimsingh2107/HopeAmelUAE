
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import eventRoutes from './routes/events.js';
import donationRoutes from './routes/donations.js';

dotenv.config();

const app = express();


app.use(cors({

  origin: function(origin, callback) {

    if (!origin || /^https?:\/\/localhost(:\d+)?$/.test(origin) || 
        /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'stripe-signature'],
  credentials: true,
  optionsSuccessStatus: 200 
}));


app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});


app.use('/api/donations/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/donations', donationRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");

  app.get("/", (req, res) => {
    res.send("Hope Amel backend is live!");
  });

  app.get("/api/test", (req, res) => {
    res.json({ status: "ok", message: "Backend connection successful!" });
  });

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
})
.catch(err => console.error(err));
