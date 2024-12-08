import React from "react";

const UserCard = ({ user, onTestResultClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer flex items-center">
      <div className="w-[48px] h-[48px] rounded-full bg-[#D9DAE4] overflow-hidden mr-4 hidden md:block">
      <img
          src="/external/profile-picture-default.png"
          alt="Profile"
          className="w-full h-full object-cover"
        />
        </div>
        <div className="flex-grow ">
          <h2 className="text-lg font-bold text-[#30336B]">
            {user?.role === "Patient"
              ? `${user.firstName} ${user.lastName}`
              : `Dr. ${user.firstName} ${user.lastName}`}
          </h2>
          <div className="text-gray-600 mt-2">
            {user.role === "Patient" ? (
              <>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </>
            ) : (
              <>
                <p>Specialty: {user.specialty || "General Practice"}</p>
                <p>@{user.username}</p>
                <p>Email: {user.email}</p>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center">
          {/* Action Buttons */}
          <div className="ml-auto flex flex-col space-y-4 space-x-0 sm:flex-row sm:space-y-0 sm:space-x-4">
            {/* Test Results and doctor profile Button */}
            {user.role === "Patient" ? (
              <button
                onClick={() => onTestResultClick(user.id)}
                className="w-[40px] h-[40px] rounded-full bg-[#D9DAE4] flex items-center justify-center group hover:bg-[#565886] transition-colors"
              >
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
            ) : (
              <button
                onClick={() => onTestResultClick(user.id)}
                className="w-[40px] h-[40px] rounded-full bg-[#D9DAE4] flex items-center justify-center group hover:bg-[#565886] transition-colors"
              >
                <img
                  src="/external/iconmonstr-user-19.svg"
                  alt="Profile"
                  className="w-5 h-5 text-[#565886] group-hover:hidden"
                />
                <img
                  src="/external/iconmonstr-user-19.svg"
                  alt="Profile"
                  className="w-5 h-5 text-[#565886] hidden group-hover:block brightness-0 invert"
                />
              </button>
            )}
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
      </div>
  );
};

export default UserCard;
