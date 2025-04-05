"use client";

import { useState } from "react";
import {
  Bell,
  Building2,
  FileText,
  Database,
  Key,
  MessageSquare,
  Package,
  Shield,
  Info,
  MonitorDot,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [selectedOption, setSelectedOption] = useState("compensating");
  const [isBusinessMenuOpen, setIsBusinessMenuOpen] = useState(false); // default hidden

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const menuItems = [
    {
      id: "contract",
      name: "Contract Management",
      icon: <FileText className="w-5 h-5 text-blue-300" />,
      route: "/",
    },
    {
      id: "compensating",
      name: "Compensating",
      icon: <Database className="w-5 h-5 text-blue-300" />,
      route: "/compensation",
    },
    {
      id: "vending",
      name: "Vending",
      icon: <Package className="w-5 h-5 text-blue-300" />,
      route: "/vending",
    },
    {
      id: "maintenance",
      name: "Maintenance Token",
      icon: <Key className="w-5 h-5 text-blue-300" />,
      route: "/tokenpage",
    },
    {
      id: "key-issue",
      name: "Key Issue Token",
      icon: <Shield className="w-5 h-5 text-blue-300" />,
      route: "/keytoken",
    },
    {
      id: "free-issue",
      name: "Free Issue Token",
      icon: <Key className="w-5 h-5 text-blue-300" />,
      route: "freetoken",
    },
  ];

  return (
    <div className="w-70 bg-gray-800 text-white h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 bg-[#0A1A3B] flex items-center gap-3">
        <Bell className="w-6 h-6 text-blue-300" />
        <span className="font-semibold text-lg">Logo Design</span>
      </div>

      {/* Business Section - clickable */}
      <div
        className="p-4  bg-[#FF9900] flex items-center gap-3 cursor-pointer"
        onClick={() => setIsBusinessMenuOpen(!isBusinessMenuOpen)}
      >
        <Building2 className="w-5 h-5 ml-2" />
        <span className="font-medium">Business</span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {isBusinessMenuOpen &&
          menuItems.map((item) => (
            <Link href={item.route} className="text-left" key={item.id}>
              <div
                className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
                  selectedOption === item.id ? "bg-blue-700" : ""
                }`}
                onClick={() => handleOptionChange(item.id)}
              >
                <div className="flex items-center gap-3 flex-grow">
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-white flex-shrink-0 ${
                      selectedOption === item.id ? "bg-blue-400" : ""
                    }`}
                  ></div>
                  {item.icon}
                  {item.name}
                </div>
              </div>
            </Link>
          ))}

        {/* Static Menu Items */}
        <div className="flex items-left gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <MessageSquare className="w-5 h-5 text-blue-300" />
          <span>Message Subscription</span>
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <Package className="w-5 h-5 text-blue-300" />
          <span>Meter Warehouse</span>
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <Shield className="w-5 h-5 text-blue-300" />
          <span>Security Module</span>
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <Info className="w-5 h-5 text-blue-300" />
          <span>Base Information</span>
        </div>

        <div className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <MonitorDot className="w-5 h-5 text-blue-300" />
          <span>System Information</span>
        </div>
      </nav>
    </div>
  );
}
