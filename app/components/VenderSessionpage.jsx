"use client";
import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Vendorsessoinform from "./Vendorsessoinform";

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function VenderSessionpage() {
  const router = useRouter();

  // State for search form inputs
  const [userCode, setUserCode] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState(getTodayDate()); // Initialize dateTo with current date
  const [status, setStatus] = useState("");
  const [selectedAreaCode, setSelectedAreaCode] = useState("");

  // State for table data and pagination
  const [vendorSessionRecords, setVendorSessionRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based for internal logic (page 0 is the first page)
  const [totalPages, setTotalPages] = useState(0);

  console.log("VenderSessionpage: Component rendered.");

  // Fetch data on component mount and when pageIndex changes
  useEffect(() => {
    console.log("VenderSessionpage: useEffect triggered for pageIndex change. Current pageIndex (0-based):", pageIndex);
    fetchVendorSessionData();
  }, [pageIndex]); // Re-fetch data when pageIndex changes

  const fetchVendorSessionData = async () => {
    console.log("VenderSessionpage: fetchVendorSessionData called.");

    const cookieString = document.cookie;
    console.log("VenderSessionpage: Current cookie string:", cookieString);

    if (!cookieString || cookieString.trim() === "") {
      console.warn("VenderSessionpage: No cookies found or cookie string is empty. Redirecting to /auth/login.");
      router.push("/auth/login");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("ACTION", "4");
    formData.append("code", userCode);

    formData.append("dateTo", dateTo); // Use dateTo state value
    console.log("VenderSessionpage: Sending dateTo in payload:", dateTo);

    if (dateFrom) { // dateFrom is UI field, add if present
      formData.append("dateFrom", dateFrom);
      console.log("VenderSessionpage: Adding dateFrom to payload:", dateFrom);
    }

    formData.append("status", status);
    // --- FIX APPLIED HERE ---
    // Convert 0-based pageIndex (internal state) to 1-based for API payload
    formData.append("PAGE_INDEX", (pageIndex + 1).toString());
    console.log("VenderSessionpage: Sending PAGE_INDEX to API (1-based):", (pageIndex + 1).toString());
    // --- END FIX ---

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("VenderSessionpage: Sending payload (object for clarity):", payloadObject);
    console.log("VenderSessionpage: Sending payload (FormData.toString()):", formData.toString());


    try {
      console.log("VenderSessionpage: Attempting to fetch from /api/vendor-sessions");
      const response = await fetch("/api/vendor-sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookieString,
          Accept: "application/json, text/javascript, */*",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formData.toString(),
      });

      console.log("VenderSessionpage: Fetch response received. Status:", response.status, "Status Text:", response.statusText);
      console.log("VenderSessionpage: Response headers:", response.headers);

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`VenderSessionpage: HTTP error! status: ${response.status}`, errorBody);
        throw new Error(`HTTP error! status: ${response.status} - ${errorBody}`);
      }

      const data = await response.json();
      console.log("VenderSessionpage: API response data (parsed JSON):", data);

      if (data.state === "0") {
        setVendorSessionRecords(data.rows || []);
        setTotalRecords(parseInt(data.total) || 0);
        setTotalPages(parseInt(data.totalPages) || 0);
        // We no longer update pageIndex here, it's controlled by user interaction.
        // This prevents the double call and ensures client state drives the request.
        console.log("VenderSessionpage: Data fetched successfully. Records received:", data.rows?.length, "Total records:", data.total, "Total pages:", data.totalPages, "Current Page (0-based state based on request):", pageIndex);
      } else {
        console.error("VenderSessionpage: API returned an error state (data.state is not '0'):", data);
        setVendorSessionRecords([]);
        setTotalRecords(0);
        setTotalPages(0);
        setPageIndex(0);
      }
    } catch (error) {
      console.error("VenderSessionpage: Error during fetch operation:", error);
      setVendorSessionRecords([]);
      setTotalRecords(0);
      setTotalPages(0);
      setPageIndex(0);
    }
  };

  const handlePageChange = (newPage) => {
    console.log("VenderSessionpage: handlePageChange called. Attempting to change to page (0-based):", newPage);
    // Ensure newPage is within valid bounds (0-based)
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage); // This state update will trigger useEffect and fetch data for the new page
    } else {
      console.log("VenderSessionpage: Page change ignored: New page out of bounds.", { newPage, totalPages, currentPageIndex: pageIndex });
    }
  };

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    console.log("VenderSessionpage: handlePageInputChange called. Input value:", value);
    if (value === "") {
      console.log("VenderSessionpage: Input value is empty, not updating pageIndex immediately.");
      return;
    }
    const page = parseInt(value);
    // Convert 1-based input to 0-based internal state
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1); // This state update will trigger useEffect and fetch data for the new page
      console.log("VenderSessionpage: Setting pageIndex from input to (0-based):", page - 1);
    } else {
      console.log("VenderSessionpage: Invalid page input or out of bounds for input field:", { page, totalPages });
    }
  };

  const handleSearchTrigger = () => {
    console.log("VenderSessionpage: handleSearchTrigger called. Resetting pageIndex to 0 and fetching data.");
    // Resetting pageIndex to 0 will trigger useEffect, which in turn calls fetchVendorSessionData.
    setPageIndex(0);
  };

  return (
    <>
      <div className="w-full bg-white p-2 md:p-6">
        <Vendorsessoinform
          userCode={userCode}
          setUserCode={setUserCode}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          status={status}
          setStatus={setStatus}
          selectedAreaCode={selectedAreaCode}
          setSelectedAreaCode={setSelectedAreaCode}
          handleSearch={handleSearchTrigger}
          handleRefresh={fetchVendorSessionData}
        />

        <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
          <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex gap-1 sm:gap-2">
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
                  onBlur={fetchVendorSessionData} // Re-fetch on blur (if value changed)
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      fetchVendorSessionData(); // Re-fetch on Enter
                    }
                  }}
                />
                <ChevronRight
                  className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 hover:text-green-600 cursor-pointer"
                  onClick={fetchVendorSessionData} // Trigger fetch when clicking this icon
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] sm:min-w-0">
              <thead className="bg-[#FF9900] text-white">
                <tr>
                  <th className="p-2 sm:p-3 text-left">User Code</th>
                  <th className="p-2 sm:p-3 text-left">User Name</th>
                  <th className="p-2 sm:p-3 text-left">Start Time</th>
                  <th className="p-2 sm:p-3 text-left">Status</th>
                  <th className="p-2 sm:p-3 text-left">Trans Amount</th>
                  <th className="p-2 sm:p-3 text-left">Bank Amount</th>
                  <th className="p-2 sm:p-3 text-left">Stop Amount</th>
                </tr>
              </thead>
              <tbody>
                {vendorSessionRecords.length > 0 ? (
                  vendorSessionRecords.map((row, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[#FFE2B7] cursor-pointer transition-colors"
                    >
                      <td className="p-2 sm:p-3">{row.Code || "-"}</td>
                      <td className="p-2 sm:p-3">{row.Code || "-"}</td> {/* Displaying Code for User Name */}
                      <td className="p-2 sm:p-3">{row.StartTime || "-"}</td>
                      <td className="p-2 sm:p-3">{row.Status || "-"}</td>
                      <td className="p-2 sm:p-3">{row.TransAmount || "-"}</td>
                      <td className="p-2 sm:p-3">{row.BankAMT || "-"}</td>
                      <td className="p-2 sm:p-3">{row.MoneybagAMT || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-500">
                      No vendor session records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default VenderSessionpage;