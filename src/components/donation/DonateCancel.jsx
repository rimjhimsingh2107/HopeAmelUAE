import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../ui/BackButton';

const DonateCancel = () => {
  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans text-[#1F2937] px-6 py-20 relative">
      <BackButton />
      
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-orange-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-logoGreen mb-4">Donation Canceled</h1>
        
        <p className="text-lg mb-6">
          Your donation process was canceled. No worries! You can try again whenever you're ready.
        </p>
        
        <div className="bg-[#E6F0F5] p-6 rounded-lg mb-8">
          <p className="text-[#22577A]">
            If you experienced any issues during the donation process or have any questions, 
            please feel free to contact us at <strong>support@hope-amel-uae.org</strong>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/donate" 
            className="bg-logoGreen text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition"
          >
            Try Again
          </Link>
          
          <Link 
            to="/" 
            className="bg-[#22577A] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonateCancel;
