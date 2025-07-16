import EventSignup from '../models/EventSignup.js';


export const joinEvent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { eventId } = req.params;

   
    if (!name || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Name and email are required'
      });
    }

    
    const existingSignup = await EventSignup.findOne({ eventId, email });
    if (existingSignup) {
      return res.status(400).json({
        status: 'error',
        message: 'You have already signed up for this event'
      });
    }

  
    const newSignup = await EventSignup.create({
      eventId,
      name,
      email
    });

    res.status(201).json({
      status: 'success',
      message: 'Successfully joined the event!',
      data: {
        signup: newSignup
      }
    });
  } catch (error) {
    console.error('Error joining event:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error joining event'
    });
  }
};


export const getEventSignups = async (req, res) => {
  try {
    const { eventId } = req.params;
    
    const signups = await EventSignup.find({ eventId });
    
    res.status(200).json({
      status: 'success',
      results: signups.length,
      data: {
        signups
      }
    });
  } catch (error) {
    console.error('Error getting event signups:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error getting event signups'
    });
  }
};
