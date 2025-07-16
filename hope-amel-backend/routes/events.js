
import express from 'express';
import EventSignup from '../models/EventSignup.js';

const router = express.Router();


router.post('/:eventId/join', async (req, res) => {
  console.log('Received join request for event:', req.params.eventId);
  console.log('Request body:', req.body);
  
  try {
    let { name, email } = req.body;
    const { eventId } = req.params;


    if (!req.body) {
      console.error('Empty request body');
      return res.status(400).json({ error: 'Request body is empty.' });
    }

    name = name?.trim();
    email = email?.trim();

    if (!name || !email) {
      console.error('Missing required fields:', { name, email });
      return res.status(400).json({ error: 'Name and email are required.' });
    }


    try {
      const newSignup = new EventSignup({
        eventId: String(eventId),
        name,
        email,
      });

      const savedSignup = await newSignup.save();
      console.log('Successfully created event signup:', savedSignup._id);
      res.status(201).json({ message: 'Successfully joined the event!' });
    } catch (dbErr) {
      console.error('Database error saving signup:', dbErr);
      res.status(500).json({ error: 'Database error. Please try again.' });
    }
  } catch (err) {
    console.error('Unexpected error in event signup route:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});


router.get('/:eventId/signups', async (req, res) => {
  try {
    const signups = await EventSignup.find({ eventId: String(req.params.eventId) });
    res.status(200).json(signups);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
