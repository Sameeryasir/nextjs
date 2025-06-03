"use client";
import React, { useState } from "react";
import {
  RefreshCw,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

function Operator() {
  const [activeTab, setActiveTab] = useState("operator");

  const [users] = useState([
    {
      userCode: "USR001",
      userName: "Alice Johnson",
      description: "Manages daily operations",
      role: "Operator",
    },
    {
      userCode: "USR002",
      userName: "Bob Smith",
      description: "Oversees customer support",
      role: "Support Lead",
    },
    {
      userCode: "USR003",
      userName: "Carol White",
      description: "Handles technical issues",
      role: "Technician",
    },
  ]);



  return (
    <>
      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "operator"
              ? "text-[#FF9900] border-b-2 border-[#FF9900]"
              : "text-gray-600 hover:text-[#FF9900]"
          }`}
          onClick={() => setActiveTab("operator")}
        >
          Operator
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "permission"
              ? "text-[#FF9900] border-b-2 border-[#FF9900]"
              : "text-gray-600 hover:text-[#FF9900]"
          }`}
          onClick={() => setActiveTab("permission")}
        >
          Permission
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "operator" && (
        <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
          <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex gap-1 sm:gap-2">
                <ChevronFirst className="w-4 h-4 cursor-pointer hover:text-[#FF9900]" />
                <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-[#FF9900]" />
                <ChevronRight className="w-4 h-4 text-[#FF9900] cursor-pointer" />
                <ChevronLast className="w-4 h-4 text-[#FF9900] cursor-pointer" />
              </div>
              <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                <span className="text-gray-600 whitespace-nowrap">
                  Total Records
                </span>
                <span className="text-gray-600 hidden sm:inline">|</span>
                <span className="text-gray-600 whitespace-nowrap">
                  Record 1-3, Page 1/1
                </span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-600 whitespace-nowrap">
                  Turn To Page
                </span>
                <input
                  type="text"
                  className="w-8 sm:w-12 border rounded px-1 sm:px-2 py-1 text-center text-xs sm:text-sm"
                  value="1"
                  readOnly
                />
                <ChevronRight className="w-3 h-3 text-green-500 hover:text-green-600 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] sm:min-w-0">
              <thead className="bg-[#FF9900] text-white">
                <tr>
                  <th className="p-2 sm:p-3 text-left">UserCode</th>
                  <th className="p-2 sm:p-3 text-left">User Name</th>
                  <th className="p-2 sm:p-3 text-left">Description</th>
                  <th className="p-2 sm:p-3 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 sm:p-3 text-sm text-gray-800">
                      {user.userCode}
                    </td>
                    <td className="p-2 sm:p-3 text-sm text-gray-800">
                      {user.userName}
                    </td>
                    <td className="p-2 sm:p-3 text-sm text-gray-800">
                      {user.description}
                    </td>
                    <td className="p-2 sm:p-3 text-sm text-gray-800 flex items-center gap-2">
                      {user.role}
                      <button
                        className="text-xs bg-[#FF9900] text-white px-2 py-1 rounded hover:bg-[#e88c00]"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "permission" && (
        <div className="bg-white p-6 rounded-lg shadow text-sm text-gray-700">
          <p>Permission management will be implemented here.</p>
        </div>
      )}
    </>
  );
}

export default Operator;
