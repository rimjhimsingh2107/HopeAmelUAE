import { Link } from 'react-router-dom';

export default function BackButton() {
  return (
    <Link 
      to="/" 
      className="fixed top-20 left-6 bg-white py-2 px-4 rounded-full shadow-md text-[#22577A] font-medium flex items-center gap-1 hover:bg-gray-50 transition z-40"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M10 19l-7-7m0 0l7-7m-7 7h18" 
        />
      </svg>
      Back to Home
    </Link>
  );
}
