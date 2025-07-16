import express from 'express';
import Stripe from 'stripe';
import Donation from '../models/Donation.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


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
      success_url: `http://localhost:5173/donate-success`,
      cancel_url: `http://localhost:5173/donate-cancel`,
      metadata: { donationId: donationRecord._id.toString() }
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});


router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;


  if (!webhookSecret) {
    console.warn('⚠️ STRIPE_WEBHOOK_SECRET not set, skipping signature verification');

    const payload = JSON.parse(req.body.toString());
    
    if (payload.type === 'checkout.session.completed') {
      try {
        const donationId = payload.data.object.metadata.donationId;
        await Donation.findByIdAndUpdate(donationId, { paid: true });
        console.log(`✅ Marked donation ${donationId} as paid`);
      } catch (err) {
        console.error('Error updating donation status:', err);
      }
    }
    
    return res.status(200).send();
  }


  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }


  if (event.type === 'checkout.session.completed') {
    const donationId = event.data.object.metadata.donationId;
    try {
      await Donation.findByIdAndUpdate(donationId, { paid: true });
      console.log(`✅ Marked donation ${donationId} as paid`);
    } catch (err) {
      console.error('Error updating donation status:', err);
      return res.status(500).send(`Error processing webhook: ${err.message}`);
    }
  }

  res.status(200).send();
});

export default router;
