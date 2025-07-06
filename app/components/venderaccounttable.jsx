"use client";
import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  Plus,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Search, // Added Search icon for the form
} from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import AllocateInformationdialog from "./AllocateInformationdialog"; // Assuming this is needed for the Allocate button

function Venderaccounttable() {
  const router = useRouter();

  // State for search form inputs
  const [userCode, setUserCode] = useState("");
  const [userName, setUserName] = useState("");

  // State for table data and pagination
  const [vendorAccountRecords, setVendorAccountRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based for internal logic, convert to 1-based for API & display
  const [totalPages, setTotalPages] = useState(0);

  // State for the Allocate dialog
  const [showAllocateDialog, setshowAllocateDialog] = useState(false);

  // Fetch data on component mount and when pageIndex or search parameters change
  useEffect(() => {
    fetchVendorAccounts();
  }, [pageIndex]); // Re-fetch when pageIndex changes

  const fetchVendorAccounts = async () => {
    const cookieString = document.cookie;
    if (!cookieString) {
      // If cookies are not found, redirect to login
      router.push("/auth/login");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("ACTION", "1");
    formData.append("userCode", userCode);
    formData.append("userName", userName);
    formData.append("isVender", "Y"); // As per payload
    formData.append("PAGE_INDEX", pageIndex.toString()); // API expects 0-based index

    try {
      const response = await fetch("/api/vendor-accounts", { // Use the rewritten URL
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookieString, // Uses cookies from the current document
          Accept: "application/json, text/javascript, */*",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "en-US,en;q=0.9",
          Connection: "keep-alive",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.state === "0") {
        setVendorAccountRecords(data.rows || []);
        setTotalRecords(parseInt(data.total) || 0);
        setTotalPages(parseInt(data.totalPages) || 0);
        // Adjust API's 1-based pageIndex to 0-based for state
        setPageIndex(parseInt(data.pageIndex) - 1 || 0);
      } else {
        console.error("API returned an error state:", data);
        setVendorAccountRecords([]);
        setTotalRecords(0);
        setTotalPages(0);
        setPageIndex(0);
      }
    } catch (error) {
      console.error("Error fetching vendor account data:", error);
      setVendorAccountRecords([]);
      setTotalRecords(0);
      setTotalPages(0);
      setPageIndex(0);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage);
    }
  };

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      // If input is cleared, keep current page or reset to 0 as per UX choice
      return;
    }
    const page = parseInt(value);
    // Convert 1-based input to 0-based index for state
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1);
    }
  };

  // Trigger search from input fields (resets page to 0)
  const handleSearch = () => {
    setPageIndex(0); // Always reset to the first page on a new search
    fetchVendorAccounts();
  };

  return (
    <div className="w-full bg-white mt-10">
      <div className="flex flex-col pb-4 mb-4 gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Vendor Account List
          </h1>
          <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={fetchVendorAccounts} // Refresh by re-fetching data with current filters
              className="bg-[#FF9900] hover:cursor-pointer text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition text-sm sm:text-base"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              className="hover:cursor-pointer bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition w-auto sm:w-[110px]"
              onClick={() => setshowAllocateDialog(true)}
            >
              <span className="hidden sm:inline ml-3">Allocate</span>
            </button>
            {showAllocateDialog && (
              <AllocateInformationdialog
                onClose={() => setshowAllocateDialog(false)}
              />
            )}{" "}
          </div>
        </div>

        <p className="text-sm font-bold text-gray-800">Searching Conditions</p>
        {/* Search Input Fields */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label htmlFor="userCode" className="text-sm text-gray-500">
              User Code:
            </label>
            <input
              type="text"
              id="userCode"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="userName" className="text-sm text-gray-500">
              Name:
            </label>
            <input
              type="text"
              id="userName"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition"
          >
            <Search size={16} />
            <span>Search</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
        {/* Pagination controls for the main table */}
        <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex gap-1 sm:gap-2">
              <ChevronFirst
                className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-[#FF9900]"
                onClick={() => handlePageChange(0)}
              />
              <ChevronLeft
                className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-[#FF9900]"
                onClick={() => handlePageChange(pageIndex - 1)}
              />
              <ChevronRight
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF9900] cursor-pointer"
                onClick={() => handlePageChange(pageIndex + 1)}
              />
              <ChevronLast
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF9900] cursor-pointer"
                onClick={() => handlePageChange(totalPages - 1)}
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
                onBlur={fetchVendorAccounts} // Re-fetch data on blur
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    fetchVendorAccounts(); // Re-fetch data on Enter key press
                  }
                }}
              />
              <ChevronRight
                className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 hover:text-green-600 cursor-pointer"
                onClick={fetchVendorAccounts}
              />
            </div>
          </div>
        </div>

        {/* Main Vendor Account Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] sm:min-w-0">
            <thead className="bg-[#FF9900] text-white">
              <tr>
                <th className="p-2 sm:p-3 text-left">User Code</th>
                <th className="p-2 sm:p-3 text-left">Name</th>
                <th className="p-2 sm:p-3 text-left">Description</th>
                <th className="p-2 sm:p-3 text-left">Department</th>
                <th className="p-2 sm:p-3 text-left">Account Balance</th>
              </tr>
            </thead>
            <tbody>
              {vendorAccountRecords.length > 0 ? (
                vendorAccountRecords.map((row, index) => (
                  <tr key={index} className="hover:bg-[#FFE2B7] cursor-pointer">
                    <td className="p-2 sm:p-3">{row.Code}</td>
                    <td className="p-2 sm:p-3">{row.Name}</td>
                    <td className="p-2 sm:p-3">{row.Description}</td>
                    <td className="p-2 sm:p-3">{row.DeptName}</td>
                    <td className="p-2 sm:p-3">{row.AccBalance}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No vendor accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Allocating List section - Keeping as is from your original code,
          but note it currently uses static 'connectionData' */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {/* Pagination controls for Allocating List (if needed, currently static) */}
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
        <div className="flex items-center justify-between mb-4 mt-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Allocating List
          </h1>
          <button className="px-3 sm:px-4 py-1 sm:py-2 bg-[#FF9900] text-white rounded whitespace-nowrap mr-10">
            Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          {/* This table section still uses static 'connectionData'.
              You would need a separate API integration for this if it's dynamic. */}
          <table className="w-full min-w-[800px] sm:min-w-0">
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
              {/* Note: `connectionData` is still static here. */}
              {/* If `connectionData` is meant to be dynamic, you'll need another API call. */}
              {/* For now, I'm removing the static `connectionData` declaration and replacing it with an empty array or a prop if it comes from parent */}
              {/* You might want to define connectionData state and fetch it similarly */}
              {/* Static data removed. If this table should be populated,
                  it needs its own data source/fetch logic. */}
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  Allocating List data (static or not implemented yet).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Venderaccounttable;