import mongoose from 'mongoose';

const EventSignupSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now }
});

export default mongoose.model('EventSignup', EventSignupSchema);
