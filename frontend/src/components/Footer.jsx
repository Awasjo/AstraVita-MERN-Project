import React from "react";

export const Footer = () => {
  return (
    <div className="bg-gray-color-2 text-white p-8">
      <div className="flex justify-center space-x-8 mb-4">
        <a href="https://www.facebook.com/people/OneDrug/100089842672293/" target="_blank" rel="noopener noreferrer">
          <img
            alt="OneDrug Facebook page"
            src="/external/iconmonstr-facebook-3.svg"
            className="w-8 h-8"
          />
        </a>
        <a href="https://www.instagram.com/onedrug6/" target="_blank" rel="noopener noreferrer">
          <img
            alt="OneDrug Instagram page"
            src="/external/iconmonstr-instagram-13.svg"
            className="w-8 h-8"
          />
        </a>
        <a href="https://www.linkedin.com/company/onedrug/" target="_blank" rel="noopener noreferrer">
          <img
            alt="OneDrug LinkedIn page"
            src="/external/iconmonstr-linkedin-3.svg"
            className="w-8 h-8"
          />
        </a>
        <a href="https://twitter.com/OneDrug__" target="_blank" rel="noopener noreferrer">
          <img
            alt="OneDrug X (Twitter) page"
            src="/external/the-site-formerly-known-as-twitter.svg"
            className="w-8 h-8"
          />
        </a>
      </div>
      <div className="text-center">
        <span>© 2024 OneDrug Inc. All rights reserved.</span>
      </div>
    </div>
  );
};
