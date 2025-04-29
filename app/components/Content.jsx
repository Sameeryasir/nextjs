"use client";
import React from "react";
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
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Globe,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import CustomerRegisteration from "./CustomerRegisteration";
import SearchByHistory from "./SearchByHistory";
import SearchCustomer from "./SearchCustomer";
import Customereventtab from "./Customereventtab";
import Connectiontab from "./Connectiontab";
import VendingTab from "./VendingTab";
import ArrearTabe from "./ArrearTabe";
import Maintaintokentab from "./Maintaintokentab";
import Freeissue from "./Freeissue";
import Freeissuetab from "./Freeissuetab";
import CancellationTab from "./CancellationTab";
function Content() {
  const [activeTab, setActiveTab] = useState("customer-event");
  const [showForm, setShowForm] = useState(false);
  const [showSearchByHistory, setShowSearchByHistory] = useState(false);
  const [showCustomerTab, setshowCustomerTab] = useState(false);
  const [showConnection, setConnectionTab] = useState(false);
  const [showVendingTab, setVendingTab] = useState(false);
  const [showarrearTab, setshowarrearTab] = useState(false);
  const [showmaintaintab, setshowmaintaintab] = useState(false);
  const [showfreeissue, setshowfreeissue] = useState(false);
  const [showcancellation, setshowcancellation] = useState(false);
  const handleOpen = () => setShowSearchByHistory(true);
  const handleClose = () => setShowSearchByHistory(false);
  const tableData = Array(6).fill({
    code: "0004100166",
    regDate: "2025-02014",
    accountNo: "31125296",
    fullName: "Aaaaaa Aaaaaaa",
    triff: "11",
    meterNum: "25120400129",
    installed: true,
    callCenter: true,
  });
  const connectionData = [
    {
      meterNum: "0004100169",
      installDate: "2025-02-14",
      installReason: "New Meter Connected",
      uninstallDate: "",
      uninstallReason: "",
      operator: "1450",
    },
  ];
  

  return (
    <>
      <div>
        <SearchCustomer />
      </div>
      <div className="p-2 md:p-6">
        {/* Search Buttons - Stack on small screens */}

        {/* First Table Container */}
        <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
          <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex gap-1 sm:gap-2">
                <ChevronFirst className="w-4 h-4 sm:w-5 sm:h-5" />
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                <ChevronLast className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                <span className="text-gray-600 whitespace-nowrap">
                  Total 1 Records
                </span>
                <span className="text-gray-600 hidden sm:inline">|</span>
                <span className="text-gray-600 whitespace-nowrap">
                  Record 1-1, Page 1/1
                </span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-600 whitespace-nowrap">
                  Turn To Page
                </span>
                <input
                  type="text"
                  className="w-8 sm:w-12 border rounded px-1 sm:px-2 py-1 text-center text-xs sm:text-sm"
                  value="1"
                />
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 hover:text-green-600" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] sm:min-w-0">
              <thead className="bg-[#FF9900] text-white">
                <tr>
                  <th className="p-2 sm:p-3 text-left">Code</th>
                  <th className="p-2 sm:p-3 text-left">Reg/Date</th>
                  <th className="p-2 sm:p-3 text-left">Account No</th>
                  <th className="p-2 sm:p-3 text-left">Full Name</th>
                  <th className="p-2 sm:p-3 text-left">Triff</th>
                  <th className="p-2 sm:p-3 text-left">Meter Num</th>
                  <th className="p-2 sm:p-3 text-left">Installed</th>
                  <th className="p-2 sm:p-3 text-left">Call Center</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-orange-100"}
                  >
                    <td className="p-2 sm:p-3">{row.code}</td>
                    <td className="p-2 sm:p-3">{row.regDate}</td>
                    <td className="p-2 sm:p-3">{row.accountNo}</td>
                    <td className="p-2 sm:p-3">{row.fullName}</td>
                    <td className="p-2 sm:p-3">{row.triff}</td>
                    <td className="p-2 sm:p-3">{row.meterNum}</td>
                    <td className="p-2 sm:p-3">
                      <span className="text-green-500">✓</span>
                    </td>
                    <td className="p-2 sm:p-3">
                      <span className="text-green-500">✓</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabs Navigation - Horizontal scroll on small screens */}
        <div className="flex overflow-x-auto pb-2 mb-4 gap-2 sm:gap-4">
          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 whitespace-nowrap ${
              activeTab === "customer-event"
                ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("customer-event");
              setshowCustomerTab(true);
              setConnectionTab(false);
              setVendingTab(false);
              setshowarrearTab(false);
              setshowmaintaintab(false);
              setshowfreeissue(false);
              setshowcancellation(false);
            }}
          >
            Customer Event
          </button>

          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 whitespace-nowrap ${
              activeTab === "connection"
                ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("connection");
              setConnectionTab(true);
              setshowCustomerTab(false);
              setVendingTab(false);
              setshowarrearTab(false);
              setshowmaintaintab(false);
              setshowfreeissue(false);
              setshowcancellation(false);
            }}
          >
            Connection
          </button>

          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 whitespace-nowrap ${
              activeTab === "vending"
                ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("vending");
              setVendingTab(true);
              setConnectionTab(false);
              setshowCustomerTab(false);
              setshowarrearTab(false);
              setshowmaintaintab(false);
              setshowcancellation(false);

              setshowfreeissue(false);
            }}
          >
            Vending
          </button>

          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 whitespace-nowrap ${
              activeTab === "arrear-contract"
                ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("arrear-contract");
              setVendingTab(false);
              setConnectionTab(false);
              setshowCustomerTab(false);
              setshowarrearTab(true);
              setshowmaintaintab(false);
              setshowfreeissue(false);
              setshowcancellation(false);
            }}
          >
            Arrear Contract
          </button>

          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 whitespace-nowrap ${
              activeTab === "maintenance-token"
                ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("maintenance-token");
              setVendingTab(false);
              setConnectionTab(false);
              setshowCustomerTab(false);
              setshowarrearTab(false);
              setshowmaintaintab(true);
              setshowfreeissue(false);
              setshowcancellation(false);
            }}
          >
            Maintenance Token
          </button>

          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 whitespace-nowrap ${
              activeTab === "free-issue-list"
                ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("free-issue-list");
              setVendingTab(false);
              setConnectionTab(false);
              setshowCustomerTab(false);
              setshowarrearTab(false);
              setshowmaintaintab(false);
              setshowfreeissue(true);
              setshowcancellation(false);
            }}
          >
            Free Issue List
          </button>

          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 whitespace-nowrap ${
              activeTab === "cancellation"
                ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("cancellation");
              setVendingTab(false);
              setConnectionTab(false);
              setshowCustomerTab(false);
              setshowarrearTab(false);
              setshowmaintaintab(false);
              setshowfreeissue(false);
              setshowcancellation(true);
            }}
          >
            Cancellation
          </button>

          <button className="px-3 sm:px-4 py-1 sm:py-2 bg-[#FF9900] text-white rounded ml-auto whitespace-nowrap">
            Refresh
          </button>
        </div>

        {/* Connection Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex gap-1 sm:gap-2">
                <ChevronFirst className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-orange-500" />
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-orange-500" />
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 hover:text-orange-600" />
                <ChevronLast className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 hover:text-orange-600" />
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                <span className="text-gray-600 whitespace-nowrap">
                  Total 1 Records
                </span>
                <span className="text-gray-600 hidden sm:inline">|</span>
                <span className="text-gray-600 whitespace-nowrap">
                  Record 1-1, Page 1/1
                </span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-600 whitespace-nowrap">
                  Turn To Page
                </span>
                <input
                  type="text"
                  className="w-8 sm:w-12 border rounded px-1 sm:px-2 py-1 text-center text-xs sm:text-sm"
                  value="1"
                />
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 hover:text-green-600" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {/* <table className="w-full min-w-[800px] sm:min-w-0">
              <thead className="bg-[#FF9900] text-white">
                <tr>
                  <th className="p-2 sm:p-3 text-left">Meter Num.</th>
                  <th className="p-2 sm:p-3 text-left">Install Date</th>
                  <th className="p-2 sm:p-3 text-left">Install Reason</th>
                  <th className="p-2 sm:p-3 text-left">Uninstall Date</th>
                  <th className="p-2 sm:p-3 text-left">Uninstall Reason</th>
                  <th className="p-2 sm:p-3 text-left">Operator</th>
                </tr>
              </thead>
              <tbody>
                {connectionData.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-2 sm:p-3">{row.meterNum}</td>
                    <td className="p-2 sm:p-3">{row.installDate}</td>
                    <td className="p-2 sm:p-3">{row.installReason}</td>
                    <td className="p-2 sm:p-3">{row.uninstallDate}</td>
                    <td className="p-2 sm:p-3">{row.uninstallReason}</td>
                    <td className="p-2 sm:p-3">{row.operator}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            {showcancellation && <CancellationTab />}
            {showfreeissue && <Freeissuetab />}
            {showmaintaintab && <Maintaintokentab />}
            {showarrearTab && <ArrearTabe />}
            {showVendingTab && <VendingTab />}
            {showConnection && <Connectiontab />}
            {activeTab=="customer-event" && <Customereventtab />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
