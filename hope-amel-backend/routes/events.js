// routes/events.js
import express from 'express';
import EventSignup from '../models/EventSignup.js';

const router = express.Router();

// POST /api/events/:eventId/join
router.post('/:eventId/join', async (req, res) => {
  const { name, email } = req.body;
  const { eventId } = req.params;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const newSignup = new EventSignup({ eventId, name, email });
    await newSignup.save();
    res.status(201).json({ message: 'Successfully joined the event!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /api/events/:eventId/signups (Optional for admin viewing)
router.get('/:eventId/signups', async (req, res) => {
  try {
    const signups = await EventSignup.find({ eventId: req.params.eventId });
    res.status(200).json(signups);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
