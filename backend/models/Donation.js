import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  amount: {
    type: Number,
    required: [true, 'Donation amount is required'],
    min: [1, 'Donation amount must be at least 1']
  },
  message: {
    type: String,
    trim: true
  },
  currency: {
    type: String,
    default: 'aed',
    enum: ['aed', 'usd']
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  stripePaymentId: String,
  stripeSessionId: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
