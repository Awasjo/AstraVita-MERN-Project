import React, { useState } from 'react';

const DemoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-100 border-b border-yellow-300 text-center p-1 sm:p-2 w-full relative z-50">
      <p className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-1 pr-8">
        This is a demonstration version of AstraVita. For the complete application, visit our
        <a 
          href="https://github.com/Awasjo/AstraVita-MERN-Project" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium mx-1 inline-block"
        >
          GitHub repository
        </a>
        to access all necessary files and learn how to run the full application with Docker Compose.
      </p>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-label="Close banner"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 sm:h-5 sm:w-5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default DemoBanner;
