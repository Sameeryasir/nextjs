"use client";
import React, { useState } from "react";
import { LogOut } from "lucide-react";

function Navigation() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const initials = "FR"; // Replace with dynamic initials if needed

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    alert("Logged out");
  };

  return (
    <div className="bg-white px-6 py-4 shadow-sm border-b">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800 tracking-wide">
          🚀 My App
        </div>

        {/* Avatar and Dropdown */}
        <div className="relative pr-10">
          <button
            onClick={toggleDropdown}
            className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {initials}
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-40 bg-white rounded-md border border-gray-200 shadow-xl z-50 animate-fade-in-up">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full transition duration-150"
              >
                <LogOut className="w-4 h-4 mr-2 text-gray-500" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
