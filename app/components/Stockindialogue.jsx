"use client";
import React, { useState, useEffect } from "react";
import {
  X,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Search, // Added Search icon for dialog's own search
} from "lucide-react";
import { useRouter } from "next/navigation";
import { apiFetcher } from "../utils/apiFetcher"; // Adjust path as necessary

function Stockindialogue({ onClose, heading = "Select Record", onSelect, apiContext }) {
  const router = useRouter();

  // Dialog's internal search states
  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState(""); // General purpose name field

  // Dialog's internal table data and pagination
  const [dialogRecords, setDialogRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state for dialog's table

  console.log("Stockindialogue: Component rendered. apiContext:", apiContext);

  useEffect(() => {
    console.log("Stockindialogue: useEffect triggered for data fetch in dialog.");
    fetchDialogData();
  }, [pageIndex, apiContext, searchCode, searchName]); // Re-fetch when page, context, or search changes

  const fetchDialogData = async () => {
    console.log("Stockindialogue: fetchDialogData called for context:", apiContext);
    setIsLoading(true);

    const formData = new URLSearchParams();
    let apiEndpoint = "";

    // Determine API endpoint and payload based on context
    switch (apiContext) {
      case "warehouse":
        formData.append("ACTION", "1"); // Action for warehouse list
        if (searchCode) formData.append("code", searchCode);
        if (searchName) formData.append("description", searchName); // Assuming name maps to description for warehouse search
        apiEndpoint = "/api/warehouse";
        break;
      case "meterModel":
        // This case is currently not used for meterModel, which is a dropdown.
        // If you had a selection dialog for meter models, this would be its API action.
        formData.append("ACTION", "1");
        if (searchCode) formData.append("code", searchCode);
        if (searchName) formData.append("description", searchName);
        apiEndpoint = "/api/meter-model";
        break;
      // Add other cases as needed (e.g., 'user', 'tariff')
      default:
        console.warn("Stockindialogue: Unknown apiContext provided:", apiContext);
        setIsLoading(false);
        return;
    }

    formData.append("PAGE_INDEX", (pageIndex + 1).toString()); // Always send 1-based index to API

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("Stockindialogue: Dialog API Payload:", payloadObject);

    try {
      const data = await apiFetcher(apiEndpoint, "POST", formData, router);
      setDialogRecords(data.rows || []);
      setTotalRecords(parseInt(data.total) || 0);
      setTotalPages(parseInt(data.totalPages) || 0);
      console.log("Stockindialogue: Data fetched successfully for context:", apiContext);
    } catch (error) {
      console.error("Stockindialogue: Error fetching dialog data:", error);
      setDialogRecords([]);
      setTotalRecords(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogSearch = () => {
    console.log("Stockindialogue: Dialog search triggered. Resetting pageIndex to 0.");
    setPageIndex(0); // Reset page to 0 on new search, useEffect will re-fetch
  };

  const handlePageChange = (newPage) => {
    console.log("Stockindialogue: handlePageChange called. New page (0-based):", newPage);
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage);
    }
  };

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    if (value === "") return;
    const page = parseInt(value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1);
    }
  };

  const handleRowSelect = (record) => {
    console.log("Stockindialogue: Row selected:", record);
    if (onSelect) {
      onSelect(record); // Pass the entire selected record back to the parent
    }
    onClose(); // Close the dialog after selection
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white w-[700px] rounded-lg shadow-xl max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-2 sm:mx-4 p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="hover:cursor-pointer absolute right-2 sm:right-4 top-2 sm:top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <h2 className="text-xl font-semibold mb-4">{heading}</h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="space-y-4">
            {/* Search fields for the dialog */}
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm sm:text-base font-medium text-gray-700">
                Code
              </label>
              <input
                type="text"
                name="code"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
                className="w-80 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-32 text-sm sm:text-base font-medium text-gray-700">
                Name/Description
              </label>
              <input
                type="text"
                name="name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleDialogSearch(); }}
                className="w-80 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-center md:justify-end">
              <button
                type="button"
                onClick={handleDialogSearch}
                className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:cursor-pointer transition-colors w-40"
              >
                <Search size={16} className="inline mr-2" /> Search
              </button>
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            {/* Dialog's Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-2 rounded gap-2 sm:gap-4">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={pageIndex === 0}
                  onClick={() => handlePageChange(0)}
                >
                  <ChevronFirst size={16} className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={pageIndex === 0}
                  onClick={() => handlePageChange(pageIndex - 1)}
                >
                  <ChevronLeft size={16} className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={pageIndex === totalPages - 1 || totalPages === 0}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight size={16} className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1 rounded hover:bg-gray-200 disabled:opacity-50"
                  disabled={pageIndex === totalPages - 1 || totalPages === 0}
                  onClick={() => handlePageChange(totalPages - 1)}
                >
                  <ChevronLast size={16} className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs sm:text-sm text-gray-600 text-center sm:text-left whitespace-nowrap">
                Total {totalRecords} Records, Record{" "}
                {totalRecords > 0 ? pageIndex * 10 + 1 : 0}-
                {Math.min((pageIndex + 1) * 10, totalRecords)}, Page{" "}
                {pageIndex + 1}/{totalPages}, Turn To Page
              </span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={pageIndex + 1}
                  onChange={handlePageInputChange}
                  onBlur={fetchDialogData}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      fetchDialogData();
                    }
                  }}
                  className="w-10 sm:w-12 px-1 sm:px-2 py-1 text-xs sm:text-sm border rounded text-center"
                />
                <span className="text-green-500 cursor-pointer hover:text-green-600">
                  →
                </span>
              </div>
            </div>

            {/* Dialog's Table */}
            <div className="overflow-x-auto mt-2 sm:mt-4">
<<<<<<< HEAD
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
                      Description
                    </th>
                    <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                      Department
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.length > 0 ? (
                    tableData.map((row, index) => (
                      <tr
                        key={index}
                        className=" hover:bg-gray-50 text-xs sm:text-sm"
                      >
                        <td className="px-2 sm:px-4 py-1 sm:py-2">
                          {row.date}
                        </td>
                        <td className="px-2 sm:px-4 py-1 sm:py-2">
                          {row.type}
                        </td>
                        <td className="px-2 sm:px-4 py-1 sm:py-2">
                          {row.remark}
                        </td>
                        <td className="px-2 sm:px-4 py-1 sm:py-2">
                          {row.operator}
=======
              {isLoading ? (
                <div className="text-center p-4">Loading data...</div>
              ) : (
                <table className="w-full min-w-[500px] sm:min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                        Code
                      </th>
                      <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                        Name/Description
                      </th>
                      {apiContext === "warehouse" && (
                          <th className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-normal">
                              Department
                          </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {dialogRecords.length > 0 ? (
                      dialogRecords.map((row, index) => (
                        <tr
                          key={row.Code || index} // Use unique key if available
                          className="border-b hover:bg-gray-50 text-xs sm:text-sm cursor-pointer"
                          onClick={() => handleRowSelect(row)}
                        >
                          <td className="px-2 sm:px-4 py-1 sm:py-2">
                            {row.Code || "-"}
                          </td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">
                            {row.Description || row.Name || "-"} {/* Use Description or Name */}
                          </td>
                          {apiContext === "warehouse" && (
                              <td className="px-2 sm:px-4 py-1 sm:py-2">
                                  {row.DeptName || "-"}
                              </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={apiContext === "warehouse" ? "3" : "2"} className="px-2 sm:px-4 py-2 sm:py-4 text-center text-xs sm:text-sm text-gray-500">
                          No records found
>>>>>>> 1b2e59c707c169096322db791a474c48fee5043b
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
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
              type="submit" // Changed to type="submit" for consistency, although row click handles selection
              className="cursor-pointer px-4 sm:px-6 py-2 text-sm sm:text-base bg-gray-800 text-white rounded-md hover:bg-gray-700"
              onClick={() => {
                // If OK button is meant to confirm selection, you might pass a default or specific record
                // For now, it just closes as row click is the primary selection method
                onClose();
              }}
            >
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Stockindialogue;
