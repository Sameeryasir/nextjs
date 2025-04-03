import React, { useState } from "react";
import {
  X,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Addnew({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    code: "",
    accountNo: "",
    meterNum: "",
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
    onClose(); // Close modal after submission
  };

  // Sample empty table data
  const tableData = [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Account No
              </label>
              <input
                type="text"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Code
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Meter Num
              </label>
              <input
                type="text"
                name="meterNum"
                value={formData.meterNum}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                >
                  <ChevronFirst size={18} />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  <ChevronLast size={18} />
                </button>
              </div>
              <span className="text-sm text-gray-600">
                Total 0 Records, Record 0, Page {currentPage}/{totalPages}, Turn
                To Page
              </span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = Math.min(
                      totalPages,
                      Math.max(1, Number(e.target.value))
                    );
                    setCurrentPage(page || 1);
                  }}
                  className="w-12 px-2 py-1 border rounded text-center"
                />
                <span className="text-green-500 cursor-pointer hover:text-green-600">
                  →
                </span>
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-2 text-left font-normal">Date</th>
                    <th className="px-4 py-2 text-left font-normal">Type</th>
                    <th className="px-4 py-2 text-left font-normal">Remark</th>
                    <th className="px-4 py-2 text-left font-normal">
                      Operator
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.length > 0 ? (
                    tableData.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{row.date}</td>
                        <td className="px-4 py-2">{row.type}</td>
                        <td className="px-4 py-2">{row.remark}</td>
                        <td className="px-4 py-2">{row.operator}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-4 py-4 text-center text-gray-500"
                      >
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gray-800 text-white rounded-md "
            >
              Ok
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addnew;
