import React, { useState } from 'react';

const DemoBanner = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-blue text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-bold mr-2">DEMO MODE</span>
            <span className="hidden md:inline">
              {isExpanded ? 
                "This is a demo version with static data. No server connection required." :
                "This is a demo version with static data."}
            </span>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="mr-3 text-sm underline hover:text-blue-200"
            >
              {isExpanded ? "Show Less" : "Learn More"}
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="ml-2 bg-white text-dark-blue rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-3 text-sm">
            <p className="mb-2">
              This demo showcases AstraVita's interface for both doctors and patients without requiring a server connection.
            </p>
            <p className="mb-2">
              To experience the full application with real data:
            </p>
            <code className="bg-navy-blue-dark p-1 rounded">
              docker compose up
            </code>
            <p className="mt-2">
              <span className="font-semibold">Demo Users:</span> Use the demo login to switch between doctor and patient views.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoBanner;
