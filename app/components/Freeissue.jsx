"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  RefreshCw,
  Plus,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

function Freeissue() {
  const router = useRouter();

  // State for form inputs (payload for ACTION 60)
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [meterNum, setMeterNum] = useState(""); // Maps to meterNum in payload
  const [refCode, setRefCode] = useState(""); // Maps to refCode in payload (for 'Code' field)
  const [cstCode, setCstCode] = useState(""); // Maps to cstCode in payload (for 'Account No' field)
  const [cstName, setCstName] = useState(""); // Maps to cstName in payload (for 'Full Name' field)

  // State for table data and pagination
  const [freeIssueRecords, setFreeIssueRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based for internal logic, convert to 1-based for API & display
  const [totalPages, setTotalPages] = useState(0);

  // State for the 'Status' dropdown (not part of current API payload, keeping as UI state)
  const [status, setStatus] = useState("");
  const statusOptions = ["Active", "Inactive", "Pending"];

  // Fetch data on component mount and when pageIndex changes
  useEffect(() => {
    fetchFreeIssueData();
  }, [pageIndex]);

  const fetchFreeIssueData = async () => {
    const cookieString = document.cookie;
    if (!cookieString) {
      // If cookies are not found, redirect to login
      router.push("/auth/login");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("ACTION", "60");
    formData.append("dateFrom", dateFrom);
    formData.append("dateTo", dateTo);
    formData.append("meterNum", meterNum);
    formData.append("refCode", refCode);
    formData.append("cstCode", cstCode);
    formData.append("cstName", cstName);
    formData.append("PAGE_INDEX", pageIndex.toString()); // API expects 0-based index

    try {
      const response = await fetch("/api/free-issue-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookieString,
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
        setFreeIssueRecords(data.rows || []);
        setTotalRecords(parseInt(data.total) || 0);
        setTotalPages(parseInt(data.totalPages) || 0);
        // Adjust API's 1-based pageIndex to 0-based for state
        setPageIndex(parseInt(data.pageIndex) - 1 || 0);
      } else {
        console.error("API returned an error state:", data);
        setFreeIssueRecords([]);
        setTotalRecords(0);
        setTotalPages(0);
        setPageIndex(0);
      }
    } catch (error) {
      console.error("Error fetching free issue data:", error);
      setFreeIssueRecords([]);
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

  return (
    <div className="p-6">
      <div className="">
        {/* Header */}
        <div className=" bg-white ">
          <div className="">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-800">
                Free Issue List
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchFreeIssueData()} // Refresh by re-fetching data
                  className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition hover:cursor-pointer"
                >
                  <RefreshCw size={18} />
                  Refresh
                </button>
                <Link href={"/bussiness/freetoken/information"}>
                  <button className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:cursor-pointer transition w-[110px]">
                    <Plus size={18} />
                    New
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-white max-w-4xl">
              <div className="grid grid-cols-2 gap-3">
                {/* Date From */}
                <div>
                  <label className="block text-md font-medium text-gray-500 mb-2">
                    Date From
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none border-gray-300"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                {/* Date To */}
                <div>
                  <label className="block text-md font-medium text-gray-500 mb-2">
                    Date To
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none border-gray-300"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
                {/* Meter Num */}
                <div>
                  <label className="block text-md font-medium text-gray-500 mb-2">
                    Meter Num
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none border-gray-300"
                    value={meterNum}
                    onChange={(e) => setMeterNum(e.target.value)}
                  />
                </div>
                {/* Full Name */}
                <div>
                  <label className="block text-md font-medium text-gray-500 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none border-gray-300"
                    value={cstName}
                    onChange={(e) => setCstName(e.target.value)}
                  />
                </div>
                {/* Code (RefCode) */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Code
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none border-gray-300"
                    value={refCode}
                    onChange={(e) => setRefCode(e.target.value)}
                  />
                </div>
                {/* Account No (cstCode) */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Account No
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none border-gray-300"
                    value={cstCode}
                    onChange={(e) => setCstCode(e.target.value)}
                  />
                </div>
                {/* Status (Not in API payload, keeping as UI only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-2 bg-white border rounded-md focus:outline-none border-gray-300"
                    >
                      <option value="">Select Status</option>
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      ></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => {
                    setPageIndex(0); // Reset to first page on new search
                    fetchFreeIssueData();
                  }}
                  className="bg-[#FF9900] text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition w-[120px]"
                >
                  <Search size={16} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white ">
          <div className="p-4 flex items-center justify-between text-sm text-gray-600">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <ChevronFirst
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => handlePageChange(0)}
                  />
                  <ChevronLeft
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => handlePageChange(pageIndex - 1)}
                  />
                  <ChevronRight
                    className="w-5 h-5 text-orange-500 cursor-pointer"
                    onClick={() => handlePageChange(pageIndex + 1)}
                  />
                  <ChevronLast
                    className="w-5 h-5 text-orange-500 cursor-pointer"
                    onClick={() => handlePageChange(totalPages - 1)}
                  />
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                  <span className="text-sm text-gray-600">
                    Total {totalRecords} Records, Record{" "}
                    {totalRecords > 0 ? pageIndex * 10 + 1 : 0}-
                    {Math.min((pageIndex + 1) * 10, totalRecords)}, Page{" "}
                    {pageIndex + 1}/{totalPages}
                  </span>
                  <span className="text-sm text-gray-600">|</span>
                  <span className="text-sm text-gray-600">Turn To Page</span>
                  <input
                    type="text"
                    className="w-12 border rounded px-2 py-1 text-sm text-center"
                    value={pageIndex + 1} // Display 1-based page index
                    onChange={handlePageInputChange}
                    onBlur={fetchFreeIssueData} // Re-fetch on blur
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        fetchFreeIssueData(); // Re-fetch on Enter
                      }
                    }}
                  />
                  <ChevronRight
                    className="w-4 h-4 text-green-500 hover:text-green-600 cursor-pointer"
                    onClick={fetchFreeIssueData}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border-white ">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FF9900] text-white h-15">
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Account No</th>
                  <th className="px-6 py-3 text-left">Customer Name</th>
                  <th className="px-6 py-3 text-left">Meter Num.</th>
                  <th className="px-6 py-3 text-left">Free Power</th>
                  <th className="px-6 py-3 text-left">Reason Code</th>
                  <th className="px-6 py-3 text-left">Operator</th>
                </tr>
              </thead>
              <tbody>
                {freeIssueRecords.length > 0 ? (
                  freeIssueRecords.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        {record.BzDate}
                      </td>
                      <td className="px-6 py-4">{record.RegCode}</td>{" "}
                      {/* Assuming RegCode maps to Account No */}
                      <td className="px-6 py-4">{record.FullName}</td>
                      <td className="px-6 py-4">{record.MeterNum}</td>
                      <td className="px-6 py-4">{record.Power}</td>
                      <td className="px-6 py-4">{record.ReasonCode}</td>
                      <td className="px-6 py-4">{record.COperator}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Freeissue;