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

 

  return (
    <div className="bg-gray-100 p-4 border-b">
      <div className="flex justify-between items-center">
        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          {/* Add a hamburger button if needed */}
        </div>

        {/* Desktop Menu */}
        <div></div>

        {/* Profile & Actions */}
        <div className="flex items-center gap-4">
            {/* <button variant="outline" >
              Logout
            </button>
        
            <button>Login</button> */}
          
        </div>
      </div>
    </div>
  );
}

export default Navigation;
