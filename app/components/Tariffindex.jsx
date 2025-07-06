"use client";
import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Plus,
  ListOrdered,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation"; // For redirection
import AllocateInformationdialog from "./AllocateInformationdialog"; // Assuming this is used for 'New'
import Link from "next/link";
import { apiFetcher } from "../utils/apiFetcher"; // Import the reusable API fetcher

function Tariffindex() {
  const router = useRouter();

  // State for the "New" dialog (AllocateInformationdialog)
  const [showAllocateDialog, setshowAllocateDialog] = useState(false);

  // State for fetched Tariff List table data
  const [tariffRecords, setTariffRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based for internal logic
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state for the table

  console.log("Tariffindex: Component rendered.");

  // Fetch data on component mount and when pageIndex changes
  useEffect(() => {
    console.log("Tariffindex: useEffect triggered for pageIndex change. Current pageIndex:", pageIndex);
    fetchTariffData();
  }, [pageIndex]); // Re-fetch data when pageIndex changes

  const fetchTariffData = async () => {
    console.log("Tariffindex: fetchTariffData called.");
    setIsLoading(true); // Start loading

    const formData = new URLSearchParams();
    formData.append("ACTION", "1");
    // No code or description search parameters as requested
    formData.append("PAGE_INDEX", (pageIndex + 1).toString()); // Send 1-based page index to API

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("Tariffindex: Sending payload (object for clarity):", payloadObject);

    try {
      // Use the reusable apiFetcher function
      const data = await apiFetcher("/api/tariffs", "POST", formData, router);

      setTariffRecords(data.rows || []);
      setTotalRecords(parseInt(data.total) || 0);
      setTotalPages(parseInt(data.totalPages) || 0);
      // We don't update pageIndex from API response here to prevent double calls
      // The pageIndex state is solely controlled by user interactions.
      console.log("Tariffindex: Data fetched successfully. Records received:", data.rows?.length, "Total records:", data.total, "Total pages:", data.totalPages);

    } catch (error) {
      console.error("Tariffindex: Error fetching data via apiFetcher:", error);
      setTariffRecords([]);
      setTotalRecords(0);
      setTotalPages(0);
      // apiFetcher already handles redirection
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handlePageChange = (newPage) => {
    console.log("Tariffindex: handlePageChange called. Attempting to change to page (0-based):", newPage);
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage); // This state update will trigger useEffect and fetch data for the new page
    } else {
      console.log("Tariffindex: Page change ignored: New page out of bounds.", { newPage, totalPages, currentPageIndex: pageIndex });
    }
  };

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    console.log("Tariffindex: handlePageInputChange called. Input value:", value);
    if (value === "") {
      console.log("Tariffindex: Input value is empty, not updating pageIndex immediately.");
      return;
    }
    const page = parseInt(value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1); // Convert 1-based input to 0-based state
      console.log("Tariffindex: Setting pageIndex from input to (0-based):", page - 1);
    } else {
      console.log("Tariffindex: Invalid page input or out of bounds for input field:", { page, totalPages });
    }
  };

  // Data for the second table (Tariff Version List) - This remains static unless an API is provided
  const tariffVersionData = [
    {
      version: "v2.1",
      startupTime: "2024-01-01",
      tariffType: "Residential",
      price: "$0.15/kWh",
      taxIncluded: "Yes",
      feeCharge: "$5.00",
      operator: "OP-1001",
      active: "Yes",
    },
    {
      version: "v1.5",
      startupTime: "2023-07-15",
      tariffType: "Commercial",
      price: "$0.20/kWh",
      taxIncluded: "Yes",
      feeCharge: "$10.00",
      operator: "OP-1002",
      active: "Yes",
    },
    {
      version: "v3.0",
      startupTime: "2024-03-01",
      tariffType: "Industrial",
      price: "$0.18/kWh",
      taxIncluded: "No",
      feeCharge: "$15.00",
      operator: "OP-1003",
      active: "No",
    },
    {
      version: "v2.0",
      startupTime: "2023-11-01",
      tariffType: "Agricultural",
      price: "$0.12/kWh",
      taxIncluded: "Yes",
      feeCharge: "$3.00",
      operator: "OP-1004",
      active: "Yes",
    },
  ];

  return (
    <div className="w-full bg-white mt-10">
      <div className="flex flex-col pb-4 mb-4 gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            List of Tariff
          </h1>
          <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={fetchTariffData} // Refresh button triggers data fetch
              className="bg-[#FF9900] hover:cursor-pointer text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition text-sm sm:text-base"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link href={'/base_information/tariff/newtariff'}>
              <button className="hover:cursor-pointer bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md hover:bg-[#FF9900] transition w-auto sm:w-[110px]">
                <Plus size={16} />
                <span className="hidden sm:inline">New</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* First Table: List of Tariff */}
      <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
        <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex gap-1 sm:gap-2">
              {/* Pagination Controls */}
              <ChevronFirst
                className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer ${pageIndex === 0 ? 'text-gray-400' : 'hover:text-[#FF9900]'}`}
                onClick={() => handlePageChange(0)}
                disabled={pageIndex === 0}
              />
              <ChevronLeft
                className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer ${pageIndex === 0 ? 'text-gray-400' : 'hover:text-[#FF9900]'}`}
                onClick={() => handlePageChange(pageIndex - 1)}
                disabled={pageIndex === 0}
              />
              <ChevronRight
                className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer ${pageIndex === totalPages - 1 || totalPages === 0 ? 'text-gray-400' : 'text-[#FF9900] hover:text-[#FF9900]'}`}
                onClick={() => handlePageChange(pageIndex + 1)}
                disabled={pageIndex === totalPages - 1 || totalPages === 0}
              />
              <ChevronLast
                className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer ${pageIndex === totalPages - 1 || totalPages === 0 ? 'text-gray-400' : 'text-[#FF9900] hover:text-[#FF9900]'}`}
                onClick={() => handlePageChange(totalPages - 1)}
                disabled={pageIndex === totalPages - 1 || totalPages === 0}
              />
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
              <span className="text-gray-600 whitespace-nowrap">
                Total {totalRecords} Records
              </span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="text-gray-600 whitespace-nowrap">
                Record{" "}
                {totalRecords > 0 ? pageIndex * 10 + 1 : 0}-
                {Math.min((pageIndex + 1) * 10, totalRecords)}, Page{" "}
                {pageIndex + 1}/{totalPages}
              </span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-600 whitespace-nowrap">
                Turn To Page
              </span>
              <input
                type="text"
                className="w-8 sm:w-12 border rounded px-1 sm:px-2 py-1 text-center text-xs sm:text-sm"
                value={pageIndex + 1} // Display 1-based page index
                onChange={handlePageInputChange}
                onBlur={fetchTariffData} // Re-fetch on blur (if value changed)
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    fetchTariffData(); // Re-fetch on Enter
                  }
                }}
              />
              <ChevronRight
                className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 hover:text-green-600 cursor-pointer"
                onClick={fetchTariffData} // Trigger fetch when clicking this icon
              />
            </div>
          </div>
        </div>

        {/* Table itself */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center p-4">Loading tariff data...</div>
          ) : (
            <table className="w-full min-w-[800px] sm:min-w-0">
              <thead className="bg-[#FF9900] text-white">
                <tr>
                  <th className="p-2 sm:p-3 text-left">Code</th>
                  <th className="p-2 sm:p-3 text-left">Description</th>
                  <th className="p-2 sm:p-3 text-left">Last Version</th>
                </tr>
              </thead>
              <tbody>
                {tariffRecords.length > 0 ? (
                  tariffRecords.map((row, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[#FFE2B7] cursor-pointer border-gray-200"
                    >
                      <td className="p-2 sm:p-3">{row.Code || "-"}</td>
                      {/* Assuming 'Branch' from original table maps to 'Description' from API based on image */}
                      <td className="p-2 sm:p-3">{row.Description || "-"}</td>
                      <td className="p-2 sm:p-3">{row.LastVersion || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-4 text-gray-500">
                      No tariff records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Second Table: Tariff Version List (Static, as no API was provided for this) */}
      <div className="bg-white rounded-lg shadow overflow-x-auto mt-6">
        <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* These pagination controls are for the static version list,
                they will continue to use their hardcoded values. */}
            <div className="flex gap-1 sm:gap-2">
              <ChevronFirst className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-orange-500" />
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-orange-500" />
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 hover:text-orange-600" />
              <ChevronLast className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 hover:text-orange-600" />
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
              <span className="text-gray-600 whitespace-nowrap">
                Total {tariffVersionData.length} Records
              </span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="text-gray-600 whitespace-nowrap">
                Record 1-{tariffVersionData.length}, Page 1/1
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
        <div className="flex items-center justify-between mb-4 mt-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            Tariff Version List
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] sm:min-w-0">
            <thead className="bg-[#FF9900] text-white">
              <tr>
                <th className="p-2 sm:p-3 text-left">Version</th>
                <th className="p-2 sm:p-3 text-left">Startup Time</th>
                <th className="p-2 sm:p-3 text-left">Tariff type</th>
                <th className="p-2 sm:p-3 text-left">Price</th>
                <th className="p-2 sm:p-3 text-left">Tax Included</th>
                <th className="p-2 sm:p-3 text-left">Fee Charge</th>
                <th className="p-2 sm:p-3 text-left">Operator</th>
                <th className="p-2 sm:p-3 text-left">Active</th>
              </tr>
            </thead>
            <tbody>
              {tariffVersionData.map((row, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50 hover:bg-[#FFE2B7]"
                  }
                >
                  <td className="p-2 sm:p-3">{row.version}</td>
                  <td className="p-2 sm:p-3">{row.startupTime}</td>
                  <td className="p-2 sm:p-3">{row.tariffType}</td>
                  <td className="p-2 sm:p-3">{row.price}</td>
                  <td className="p-2 sm:p-3">{row.taxIncluded}</td>
                  <td className="p-2 sm:p-3">{row.feeCharge}</td>
                  <td className="p-2 sm:p-3">{row.operator}</td>
                  <td className="p-2 sm:p-3">{row.active}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showAllocateDialog && (
        <AllocateInformationdialog
          onClose={() => setshowAllocateDialog(false)}
        />
      )}{" "}
    </div>
  );
}

export default Tariffindex;
