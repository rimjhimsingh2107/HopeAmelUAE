import Stripe from 'stripe';
import Donation from '../models/Donation.js';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';


export const createCheckoutSession = async (req, res) => {
  try {
    const { name, amount, message, email } = req.body;
    console.log('Received donation request:', { name, amount, message, email });

    
    if (!name || !amount) {
      console.log('Validation error: Name or amount missing');
      return res.status(400).json({
        status: 'error',
        message: 'Name and donation amount are required'
      });
    }

    
    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      console.log('Validation error: Invalid amount', amount);
      return res.status(400).json({
        status: 'error',
        message: 'Donation amount must be greater than zero'
      });
    }


    console.log('Creating donation record in database');
    const donation = await Donation.create({
      name,
      email,
      amount: donationAmount,
      message,
      currency: 'aed',
      status: 'pending'
    });
    console.log('Donation record created:', donation._id);

    
    console.log('Creating Stripe checkout session');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aed',
            product_data: {
              name: 'Donation to Hope Amel UAE',
              description: 'Supporting single mothers in the UAE'
            },
            unit_amount: Math.round(donationAmount * 100) 
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${FRONTEND_URL}/donate-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/donate-cancel`,
      metadata: {
        donationId: donation._id.toString()
      }
    });
    console.log('Stripe session created:', session.id);

    
    await Donation.findByIdAndUpdate(donation._id, {
      stripeSessionId: session.id
    });
    console.log('Donation record updated with session ID');

    console.log('Sending checkout URL to client:', session.url);
    res.status(200).json({
      status: 'success',
      url: session.url
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error creating checkout session'
    });
  }
};


export const handleStripeWebhook = async (req, res) => {
  let event;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {

    if (webhookSecret) {
      const signature = req.headers['stripe-signature'];
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } else {
   
      event = req.body;
    }

 
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const donationId = session.metadata.donationId;
        
       
        await Donation.findByIdAndUpdate(donationId, {
          status: 'completed',
          stripePaymentId: session.payment_intent
        });
        break;
        
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }
};

export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      results: donations.length,
      data: {
        donations
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error getting donations'
    });
  }
};
