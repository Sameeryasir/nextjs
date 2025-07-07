import React, { useState } from "react";
import {
  X,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Dialogue3({ onClose }) {
  const [formData, setFormData] = useState({
    meterNum: "",
    accountNo: "",
    code: "",
    fullName: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  const tableData = [
    {
      code: "EM100001",
      date: "2023-01-15",
      type: "New",
      description: "Installed new energy meter",
      department: "Electrical",
      sgc: "SGC-001",
    },
    {
      code: "WM200101",
      date: "2022-08-10",
      type: "Used",
      description: "Transferred from East warehouse",
      department: "Logistics",
      sgc: "SGC-002",
    },
  ];

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-2 sm:mx-4 p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-2 sm:right-4 top-2 sm:top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Select the Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Filters section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Meter Num */}
            <div className="flex items-center gap-2 sm:gap-4">
              <label className="text-gray-700 text-sm sm:text-base font-medium whitespace-nowrap w-24">
                Meter Num.
              </label>
              <input
                type="text"
                name="meterNum"
                value={formData.meterNum}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Account No */}
            <div className="flex items-center gap-2 sm:gap-4">
              <label className="text-gray-700 text-sm sm:text-base font-medium whitespace-nowrap w-24">
                Account No.
              </label>
              <input
                type="text"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Code */}
            <div className="flex items-center gap-2 sm:gap-4">
              <label className="text-gray-700 text-sm sm:text-base font-medium whitespace-nowrap w-24">
                Code
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Full Name */}
            <div className="flex items-center gap-2 sm:gap-4">
              <label className="text-gray-700 text-sm sm:text-base font-medium whitespace-nowrap w-24">
                FullName
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Search button aligned left */}
          <div className="mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:brightness-110"
            >
              Search...
            </button>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full min-w-[500px] sm:min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-normal">
                    Code
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-normal">
                    Date
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-normal">
                    Types
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-normal">
                    Description
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-normal">
                    Department
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-normal">
                    SGC
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 text-xs sm:text-sm"
                    >
                      <td className="px-2 sm:px-4 py-2">{row.code}</td>
                      <td className="px-2 sm:px-4 py-2">{row.date}</td>
                      <td className="px-2 sm:px-4 py-2">{row.type}</td>
                      <td className="px-2 sm:px-4 py-2">{row.description}</td>
                      <td className="px-2 sm:px-4 py-2">{row.department}</td>
                      <td className="px-2 sm:px-4 py-2">{row.sgc}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-4 text-center text-sm text-gray-500"
                    >
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dialogue3;
