"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  MonitorDot,
  Shield,
  Globe,
  LogOut,
  Menu,
  X,
} from "lucide-react";

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-gray-100 p-4 border-b">
      <div className="flex justify-between items-center">
        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button onClick={toggleMenu}>
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-gray-600" />
            <span>SVG</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <span>Reports</span>
          </div>
          <div className="flex items-center gap-2">
            <MonitorDot className="w-5 h-5 text-gray-600" />
            <span>Desktop</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-600" />
            <span>Control Panel</span>
          </div>
        </div>

        {/* Profile & Actions */}
        <div className="flex items-center gap-4">
          <Globe className="w-5 h-5 text-gray-600 hidden sm:block" />
          <LogOut className="w-5 h-5 text-gray-600 hidden sm:block" />
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <div className="hidden sm:block">
              <div className="font-medium">Ruben</div>
              <div className="text-sm text-gray-500">Online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-gray-600" />
            <span>SVG</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <span>Reports</span>
          </div>
          <div className="flex items-center gap-2">
            <MonitorDot className="w-5 h-5 text-gray-600" />
            <span>Desktop</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-600" />
            <span>Control Panel</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-600" />
            <span>Global</span>
          </div>
          <div className="flex items-center gap-2">
            <LogOut className="w-5 h-5 text-gray-600" />
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navigation;
