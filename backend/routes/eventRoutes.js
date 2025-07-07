import express from 'express';
import { joinEvent, getEventSignups } from '../controllers/eventController.js';

const router = express.Router();

// POST /api/events/:eventId/join - Join an event
router.post('/:eventId/join', joinEvent);

// GET /api/events/:eventId/signups - Get all signups for an event (admin)
router.get('/:eventId/signups', getEventSignups);

export default router;
