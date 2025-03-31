import React from "react";
import {
  LayoutDashboard,
  FileText,
  MonitorDot,
  Shield,
  Globe,
  LogOut,
} from "lucide-react";

function Navigation() {
  return (
    <div className="bg-gray-100 p-4 flex justify-end items-center border-b">
      <div className="flex items-center gap-8">
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

        <div className="flex items-center gap-4">
          <Globe className="w-5 h-5 text-gray-600" />
          <LogOut className="w-5 h-5 text-gray-600" />
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="font-medium">Ruben</div>
              <div className="text-sm text-gray-500">Online</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
