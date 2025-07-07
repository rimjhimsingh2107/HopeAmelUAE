import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../ui/BackButton';

const DonateSuccess = () => {
  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans text-[#1F2937] px-6 py-20 relative">
      <BackButton />
      
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-green-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-logoGreen mb-4">Thank You For Your Donation!</h1>
        
        <p className="text-lg mb-6">
          Your generous contribution will help support single mothers in the UAE. 
          We truly appreciate your kindness and compassion.
        </p>
        
        <div className="bg-[#FFF9DA] p-6 rounded-lg mb-8">
          <p className="italic text-[#22577A]">
            "When you uplift a mother, you uplift a family. 
            When you uplift a family, you uplift a community."
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="bg-logoGreen text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition"
          >
            Return to Homepage
          </Link>
          
          <Link 
            to="/events" 
            className="bg-[#22577A] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
          >
            Explore Our Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonateSuccess;
