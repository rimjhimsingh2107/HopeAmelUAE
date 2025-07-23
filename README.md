# Hope Amel UAE 🌟

A full-stack web application supporting single mothers in the UAE through community events and donation management.

##  Demo
**Website:** [https://hope-amel-uae-4map.onrender.com](https://hope-amel-uae-4map.onrender.com)

## Tech Stack
**Frontend:** React, Vite, Tailwind CSS, React Router  
**Backend:** Node.js, Express, MongoDB Atlas, Mongoose  
**Services:** Stripe API, Render Cloud Hosting

##  Start

### Installation
```bash
# Clone repository
git clone https://github.com/rimjhimsingh2107/HopeAmelUAE.git
cd hope-amel-uae

# Install dependencies
npm install
cd backend && npm install && cd ..

# Set up environment variables in backend/.env
PORT=5002
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
NODE_ENV=development
```

## Development
```bash
Start backend in backend directory:
npm run dev

 Start frontend in root directory:
npm run dev
```

## Features
**Event Registration:** Browse and register for community events
**Donation Processing:** Secure payments via Stripe
**Responsive Design:** Mobile-first, accessible UI
**Admin Dashboard:** Event and donation management

## Deployment

**Frontend:** Render Static Site (npm run build → dist)

**Backend:** Render Web Service (root: backend, start: npm start)

## API Endpoints
GET /api/events - Get all events


POST /api/events/:id/join - Register for event


POST /api/donations/create-checkout-session - Create payment




Made with ❤️ for Hope Amel UAE 
