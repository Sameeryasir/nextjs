import React, { useState } from "react";
import {
  X,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
function Purchasechartdialogue2({onClose}) {
  const [formData, setFormData] = useState({
    fullName: "",
    code: "",
    accountNo: "",
    meterNum: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const tableData = [
    {
      code: "A001",
      date: "2023-01-01",
      projectType: "Solar",
      payMethod: "Cash",
    },
    {
      code: "A002",
      date: "2023-01-02",
      projectType: "Wind",
      payMethod: "Bank Transfer",
    },
    {
      code: "A003",
      date: "2023-01-03",
      projectType: "Hydro",
      payMethod: "Credit Card",
    },
    {
      code: "A004",
      date: "2023-01-04",
      projectType: "Solar",
      payMethod: "Mobile Payment",
    },
    {
      code: "A005",
      date: "2023-01-05",
      projectType: "Wind",
      payMethod: "Cash",
    },
    {
      code: "A006",
      date: "2023-01-06",
      projectType: "Solar",
      payMethod: "Bank Transfer",
    },
    {
      code: "A007",
      date: "2023-01-07",
      projectType: "Hydro",
      payMethod: "Cash",
    },
  ];

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

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

  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-2 sm:mx-4 p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-2 sm:right-4 top-2 sm:top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">Search Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-4">
              <label
                className="text-gray-700 text-sm sm:text-base font-medium whitespace-nowrap"
                htmlFor="fullName"
              >
                Code
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <label
                htmlFor="meterNum"
                className="text-gray-700 text-sm sm:text-base font-medium whitespace-nowrap"
              >
                Name
              </label>
              <input
                id="meterNum"
                type="text"
                name="meterNum"
                value={formData.meterNum}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-2 rounded gap-2 sm:gap-4">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(1)}
                >
                  <ChevronFirst size={16} className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={16} className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                >
                  <ChevronRight size={16} className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  <ChevronLast size={16} className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs sm:text-sm text-gray-600 text-center sm:text-left whitespace-nowrap">
                Total {tableData.length} Records, Page {currentPage}/
                {totalPages}, Turn To Page
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
                  className="w-10 sm:w-12 px-1 sm:px-2 py-1 text-xs sm:text-sm border rounded text-center"
                />
                <span className="text-green-500 cursor-pointer hover:text-green-600">
                  →
                </span>
              </div>
            </div>

            <div className="overflow-x-auto mt-2 sm:mt-4">
              <table className="w-full min-w-[500px] sm:min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                      Code
                    </th>
                    <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                      Date
                    </th>
                    <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                      Project Type
                    </th>
                    <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                      Pay Method
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-2 sm:px-4 py-1 sm:py-2">{item.code}</td>
                      <td className="px-2 sm:px-4 py-1 sm:py-2">{item.date}</td>
                      <td className="px-2 sm:px-4 py-1 sm:py-2">
                        {item.projectType}
                      </td>
                      <td className="px-2 sm:px-4 py-1 sm:py-2">
                        {item.payMethod}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 sm:px-6 py-2 text-sm sm:text-base border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Purchasechartdialogue2