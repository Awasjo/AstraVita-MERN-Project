import React from 'react';

const Contact = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:support@onedrug.com?subject=Inquiry';
  };

  return (
    <div 
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/external/contact-background.png")',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-3xl mx-auto bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="bg-blue-700 px-6 py-8 text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-sm">Contact Us</h1>
          <p className="mt-2 text-white font-medium">Get in touch with us to learn more about how OneDrug is reshaping the future of healthcare</p>
        </div>
        
        <div className="px-6 py-8 bg-white">
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 hover:bg-blue-50 p-3 rounded-lg transition-colors">
                <svg className="h-7 w-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-800 font-medium text-lg">support@onedrug.com</span>
              </div>
              <div className="flex items-center space-x-4 hover:bg-blue-50 p-3 rounded-lg transition-colors">
                <svg className="h-7 w-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-800 font-medium text-lg">1-800-ONEDRUG</span>
              </div>
              <div className="flex items-center space-x-4 hover:bg-blue-50 p-3 rounded-lg transition-colors">
                <svg className="h-7 w-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-800 font-medium text-lg">123 Healthcare Street, Medical District, ON M1M 1M1</span>
              </div>
            </div>

            {/* Email Button */}
            <div className="pt-4">
              <button
                onClick={handleEmailClick}
                className="w-full bg-blue-700 text-white rounded-lg px-6 py-4 text-lg font-semibold transition-all duration-200 hover:bg-blue-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Send us an Email
              </button>
            </div>

            {/* Operating Hours */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Operating Hours</h3>
              <div className="grid grid-cols-2 gap-4 text-base text-gray-800">
                <div className="font-medium">Monday - Friday</div>
                <div>9:00 AM - 6:00 PM</div>
                <div className="font-medium">Saturday</div>
                <div>10:00 AM - 4:00 PM</div>
                <div className="font-medium">Sunday</div>
                <div>Closed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
