"use client";

import { useEffect, useState } from "react";
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
  Banknote,
  MessagesSquare,
  icons,
  Wallet,
  Layers,
  WalletCards,
  KeyRound,
  Ticket,
  ListOrdered,
  KeyIcon,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [selectedOption, setSelectedOption] = useState("contract"); // Default to "contract"
  const [activeMenu, setActiveMenu] = useState("business"); // Track which menu is open

  // Initialize with business menu open and contract selected
  useEffect(() => {
    setActiveMenu("business");
    setSelectedOption("contract");
  }, []);

  const handleMenuToggle = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const securityItems = [
    {
      id: "securitymodule",
      name: "Security Module",
      icon: <Shield className="w-5 h-5 text-white" />,
      route: "/security_module",
    },
    {
      id: "Balencermanagement",
      name: "Balencer Management",
      icon: <Layers className="w-5 h-5 text-white" />,
      route: "/balencer_management",
    },
    {
      id: "creditbalence",
      name: "Credit Balence",
      icon: <Wallet className="w-5 h-5 text-white" />,
      route: "/credit_balence",
    },
    {
      id: "keychanges",
      name: "Key Changes",
      icon: <KeyRound className="w-5 h-5 text-white" />,
      route: "/key_changes",
    },
    {
      id: "tokenavailability",
      name: "Token Availability",
      icon: <Ticket className="w-5 h-5 text-white" />,
      route: "/token_availability",
    },
    {
      id: "transactionviewer",
      name: "Transaction Viewer",
      icon: <ListOrdered className="w-5 h-5 text-white" />,
      route: "/transaction_viewer",
    },
    {
      id:'specialtoken',
      name:"Special Token",
      icon:<KeyIcon className="w-5 h-5 text-white"/>,
      route:"/specialtoken"
    }
  ];

  const financeItems = [
    {
      id: "venderaccount",
      name: "Vender Account",
      icon: <FileText className="w-5 h-5 text-blue-300" />,
      route: "/venderaccount",
    },
    {
      id: "vendersession",
      name: "Vender Session",
      icon: <FileText className="w-5 h-5 text-blue-300" />,
      route: "/vendorsession",
    },
  ];

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
      route: "/Keytoken",
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
      <div className="p-4 flex items-center ml-19">
        <span className="font-semibold text-lg">SECDAIS</span>
      </div>

      {/* Menu Items */}
      <nav className="">
        {/* Business Section */}
        <div
          className="p-4 mb-3 hover:bg-[#FF9900] flex items-center justify-start gap-3 cursor-pointer"
          onClick={() => handleMenuToggle("business")}
        >
          <Building2 className="w-5 h-5" />
          <span className="font-medium text-left">Business</span>
        </div>
        {activeMenu === "business" &&
          menuItems.map((item) => (
            <Link href={item.route} className="text-left" key={item.id}>
              <div
                className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
                  selectedOption === item.id ? "bg-blue-700" : ""
                }`}
                onClick={() => setSelectedOption(item.id)}
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

        {/* Finance Section */}
        <div
          className="p-4 mb-3 hover:bg-[#FF9900] flex items-center justify-start gap-3 cursor-pointer"
          onClick={() => handleMenuToggle("finance")}
        >
          <Banknote className="w-5 h-5 text-white" />
          <span>Finance</span>
        </div>
        {activeMenu === "finance" &&
          financeItems.map((item) => (
            <Link href={item.route} className="text-left" key={item.id}>
              <div
                className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
                  selectedOption === item.id ? "bg-blue-700" : ""
                }`}
                onClick={() => setSelectedOption(item.id)}
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

        {/* Message Subscription (static link) */}
        <Link href={"/messegesubscription"}>
          <div className="p-4 mb-3 hover:bg-[#FF9900] flex items-center justify-start gap-3 cursor-pointer">
            <MessagesSquare className="w-5 h-5 text-white" />
            <span>Message Subscription</span>
          </div>
        </Link>

        {/* Security Module Section */}
        <div
          className="p-4 mb-3 hover:bg-[#FF9900] flex items-center justify-start gap-3 cursor-pointer"
          onClick={() => handleMenuToggle("security")}
        >
          <Banknote className="w-5 h-5 text-white" />
          <span>Security Module</span>
        </div>
        {activeMenu === "security" &&
          securityItems.map((item) => (
            <Link href={item.route} className="text-left" key={item.id}>
              <div
                className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
                  selectedOption === item.id ? "bg-blue-700" : ""
                }`}
                onClick={() => setSelectedOption(item.id)}
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
        <div className="p-4 mb-3 hover:bg-[#FF9900] flex items-center justify-start gap-3 cursor-pointer">
          <Info className="w-5 h-5 text-blue-300" />
          <span>Base Information</span>
        </div>
        <div className="p-4 mb-3 hover:bg-[#FF9900] flex items-center justify-start gap-3 cursor-pointer">
          <MonitorDot className="w-5 h-5 text-blue-300" />
          <span>System Information</span>
        </div>
      </nav>
    </div>
  );
}
