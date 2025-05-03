import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  ChevronFirst,
  Check,
  X,
  Package,
} from "lucide-react";

const dummyData = [
  {
    code: "00000001",
    description: "Magasin General Nagzidja...",
    department: "Aaaaa............",
    share: true,
    active: true,
  },
  {
    code: "00000001",
    description: "Magasin General Nagzidja...",
    department: "Aaaaa............",
    share: false,
    active: true,
  },
  {
    code: "00000001",
    description: "Magasin General Nagzidja...",
    department: "Aaaaa............",
    share: false,
    active: true,
  },
  {
    code: "00000001",
    description: "Magasin General Nagzidja...",
    department: "Aaaaa............",
    share: true,
    active: true,
  },
  {
    code: "00000001",
    description: "Magasin General Nagzidja...",
    department: "Aaaaa............",
    share: false,
    active: true,
  },
  {
    code: "00000001",
    description: "Magasin General Nagzidja...",
    department: "Aaaaa............",
    share: false,
    active: true,
  },
  {
    code: "00000001",
    description: "Magasin General Nagzidja...",
    department: "Aaaaa............",
    share: true,
    active: true,
  },
  {
    code: "00000001",
    description: "Magasin General Nagzidja...",
    department: "Aaaaa............",
    share: false,
    active: true,
  },
];

function Warehousetable() {
  return (
    <div className="w-full bg-white p-2 md:p-6">
      <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
        {/* Pagination */}
        <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex gap-1 sm:gap-2">
              <ChevronFirst className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-[#FF9900]" />
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-[#FF9900]" />
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF9900] cursor-pointer" />
              <ChevronLast className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF9900] cursor-pointer" />
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
              <span className="text-gray-600 whitespace-nowrap">
                Total 8 Records
              </span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="text-gray-600 whitespace-nowrap">
                Record 1-8, Page 1/1
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
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 hover:text-green-600 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] sm:min-w-0 text-center">
            <thead className="bg-[#FF9900] text-white">
              <tr>
                <th className="p-2 sm:p-3">Code</th>
                <th className="p-2 sm:p-3">Description</th>
                <th className="p-2 sm:p-3">Department</th>
                <th className="p-2 sm:p-3">Share</th>
                <th className="p-2 sm:p-3">Active</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item, index) => (
                <tr key={index} className="hover:bg-[#FFE2B7] cursor-pointer">
                  <td className="p-2 sm:p-3 flex items-center justify-center gap-2">
                    <Package className="w-4 h-4 text-gray-600" />
                    {item.code}
                  </td>
                  <td className="p-2 sm:p-3 items-center">{item.description}</td>
                  <td className="p-2 sm:p-3 items-center">{item.department}</td>
                  <td className="p-2 sm:p-3">
                    {item.share ? (
                      <Check className="text-green-600 w-5 h-5 inline" />
                    ) : (
                      <X className="text-red-600 w-5 h-5 inline" />
                    )}
                  </td>
                  <td className="p-2 sm:p-3">
                    {item.active ? (
                      <Check className="text-green-600 w-5 h-5 inline" />
                    ) : (
                      <X className="text-red-600 w-5 h-5 inline" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Warehousetable;
