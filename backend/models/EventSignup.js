import mongoose from 'mongoose';

const eventSignupSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: [true, 'Event ID is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


eventSignupSchema.index({ eventId: 1, email: 1 }, { unique: true });

const EventSignup = mongoose.model('EventSignup', eventSignupSchema);

export default EventSignup;
