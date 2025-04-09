import React from 'react'

const UnderConstruction = ({ title }) => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5]">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-[#30336B] mb-2">{title}</h1>
          <p className="text-gray-600">This section is currently under construction. Please check back later.</p>
        </div>
      </div>
    );
  };

export default UnderConstruction