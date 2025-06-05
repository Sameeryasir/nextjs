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
import Operator from "./Operator";
import Dialogue from "./dialogue";

function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [roles, setRoles] = useState([
    {
      code: "ADMIN001",
      name: "Administrator",
      description: "Full access to all system features",
      privilege: "High",
    },
    {
      code: "MOD002",
      name: "Moderator",
      description: "Can manage user content and reports",
      privilege: "Medium",
    },
    {
      code: "USR003",
      name: "User",
      description: "Limited access to personal content",
      privilege: "Low",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleRefresh = () => {
    setIsFading(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsFading(false);
      setIsLoading(false);
    }, 500);
  };
  return (
    <>
      <div className="w-full bg-white mt-10">
        {" "}
        {isLoading && (
          <div className="fixed inset-0 pl-40 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF9900]"></div>
          </div>
        )}
        <div
          className={`w-full bg-white mt-10 transition-opacity duration-300 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex flex-col pb-4 mb-4 gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                Role List
              </h1>
              <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
                <button
                  onClick={handleRefresh}
                  className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition text-sm sm:text-base"
                >
                  <RefreshCw size={16} />
                  <span className="hidden sm:inline hover:cursor-pointer">
                    Refresh
                  </span>
                </button>
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition w-auto sm:w-[110px]"
                >
                  <Plus size={16} />
                  <span className="hidden sm:inline hover:cursor-pointer">
                    New
                  </span>
                </button>
                {isDialogOpen && (
                  <Dialogue onClose={() => setIsDialogOpen(false)} />
                )}
              </div>
            </div>
          </div>

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
                    <th className="p-2 sm:p-3 text-left">Code</th>
                    <th className="p-2 sm:p-3 text-left">Role Name</th>
                    <th className="p-2 sm:p-3 text-left">Description</th>
                    <th className="p-2 sm:p-3 text-left">Privilege level</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role, index) => (
                    <tr key={index} className=" hover:bg-gray-50">
                      <td className="p-2 sm:p-3 text-sm text-gray-800">
                        {role.code}
                      </td>
                      <td className="p-2 sm:p-3 text-sm text-gray-800">
                        {role.name}
                      </td>
                      <td className="p-2 sm:p-3 text-sm text-gray-800">
                        {role.description}
                      </td>
                      <td className="p-2 sm:p-3 text-sm text-gray-800">
                        {role.privilege}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Operator />
        </div>
      </div>
    </>
  );
}

export default Page;
