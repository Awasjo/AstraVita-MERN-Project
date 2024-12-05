import React from "react";

export const Footer = () => {
  return (
    <div className="bg-gray-color-2 text-white p-8">
      <div className="flex justify-center space-x-4 mb-4">
        <img
          alt="facebook"
          src="/external/iconmonstr-facebook-3.svg"
          className="w-8 h-8"
          
        />
        <img
          alt="Instagram"
          src="/external/iconmonstr-instagram-13.svg"
          className="w-8 h-8"
        />
        <img
          alt="Instagram"
          src="/external/iconmonstr-linkedin-3.svg"
          className="w-8 h-8"
        />
        <img
          alt="X - formerly known as twitter"
          src="/external/the-site-formerly-known-as-twitter.svg"
          className="w-8 h-8"
        />
      </div>
      <div className="text-center">
        <span>© 2024 OneDrug Inc. All rights reserved.</span>
      </div>
    </div>
  );
};
