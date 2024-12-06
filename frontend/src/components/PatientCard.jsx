// PatientCard.jsx
import React from 'react';

const PatientCard = ({ patient, onClick }) => {
  return (
    <div 
      className="relative w-[1080px] h-[80px] bg-white shadow-sm rounded-md flex items-center px-5 mb-4 cursor-pointer"
      onClick={() => onClick(patient._id)}
    >
      {/* Profile Picture */}
      <div className="w-[48px] h-[48px] rounded-full bg-[#D9DAE4] overflow-hidden flex items-center justify-center group">
        {patient.profilePicture ? (
          <img
            src={patient.profilePicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <img
              src="/external/iconmonstruser3112411-vi2f.svg"
              alt="Profile"
              className="w-6 h-6 text-[#565886] group-hover:hidden"
            />
            <img
              src="/external/iconmonstruser3112193-o16o.svg"
              alt="Profile"
              className="w-6 h-6 text-[#565886] hidden group-hover:block brightness-0 invert"
            />
          </>
        )}
      </div>

      {/* Patient Info */}
      <div className="ml-5">
        <h3 className="text-[16px] font-semibold text-[#222222] leading-[19px]">
          {patient.firstName} {patient.lastName}
        </h3>
        <p className="text-[14px] font-medium text-[#666666] leading-[17px] mt-1">
          @{patient.username}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="ml-auto flex items-center space-x-4">
        {/* Test Results Button */}
        <button className="w-[40px] h-[40px] rounded-full bg-[#D9DAE4] flex items-center justify-center group hover:bg-[#565886] transition-colors">
          <img
            src="/external/iconmonstrclipboard122522-7uj8.svg"
            alt="Test Results"
            className="w-5 h-5 text-[#565886] group-hover:hidden"
          />
          <img
            src="/external/iconmonstrclipboard112192-hxc9.svg"
            alt="Test Results"
            className="w-5 h-5 text-[#565886] hidden group-hover:block brightness-0 invert"
          />
        </button>

        {/* Message Button */}
        <button className="w-[40px] h-[40px] rounded-full bg-[#D9DAE4] flex items-center justify-center group hover:bg-[#565886] transition-colors">
          <img
            src="/external/iconmonstrspeechbubble1922522-dzz4.svg"
            alt="Message"
            className="w-5 h-5 text-[#565886] group-hover:hidden"
          />
          <img
            src="/external/iconmonstrspeechbubble1912234-e9s.svg"
            alt="Message"
            className="w-5 h-5 text-[#565886] hidden group-hover:block brightness-0 invert"
          />
        </button>

        {/* Remove Button */}
        <button className="w-[40px] h-[40px] rounded-full bg-[#D9DAE4] flex items-center justify-center group hover:bg-[#565886] transition-colors">
          <img
            src="/external/iconmonstrxmark912522-0v6q.svg"
            alt="Remove"
            className="w-5 h-5 text-[#565886] group-hover:hidden"
          />
          <img
            src="/external/iconmonstr-x-mark-9.svg"
            alt="Remove"
            className="w-5 h-5 text-[#565886] hidden group-hover:block brightness-0 invert"
          />
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
