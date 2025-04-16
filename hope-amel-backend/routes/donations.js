import express from 'express';
import Stripe from 'stripe';
import Donation from '../models/Donation.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe checkout session
router.post('/create-checkout-session', async (req, res) => {
  const { name, amount, message } = req.body;

  try {
    const donationRecord = await Donation.create({ name, amount, message });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aed',
            product_data: { name: 'Hope Amel Donation' },
            unit_amount: amount * 100
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `https://your-frontend-url.com/donate-success`,
      cancel_url: `https://your-frontend-url.com/donate-cancel`,
      metadata: { donationId: donationRecord._id.toString() }
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Stripe webhook to mark donation as paid
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const donationId = event.data.object.metadata.donationId;
    await Donation.findByIdAndUpdate(donationId, { paid: true });
  }

  res.status(200).send();
});

export default router;
