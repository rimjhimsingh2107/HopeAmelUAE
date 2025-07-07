import express from 'express';
import { createCheckoutSession, handleStripeWebhook, getAllDonations } from '../controllers/donationController.js';

const router = express.Router();

// Stripe webhook handler
router.post('/webhook', handleStripeWebhook);

// POST /api/donations/create-checkout-session - Create a checkout session
router.post('/create-checkout-session', createCheckoutSession);

// GET /api/donations - Get all donations (admin)
router.get('/', getAllDonations);

export default router;
