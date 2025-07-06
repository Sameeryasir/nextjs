// Content.jsx
"use client";
import React, { useState, useEffect, useCallback } from "react";

// Import the new components
import SearchForm from "../sections/SearchForm";
import CustomerTable from "../sections/CustomerTable";

// Other tab components (keep these if they are rendered based on activeTab)
import Customereventtab from "./Customereventtab";
import Connectiontab from "./Connectiontab";
import VendingTab from "./VendingTab";
import ArrearTabe from "./ArrearTabe";
import Maintaintokentab from "./Maintaintokentab";
import Freeissuetab from "./Freeissuetab";
import CancellationTab from "./CancellationTab";


function Content() {
  const [activeTab, setActiveTab] = useState("customer-event");
  const [tableData, setTableData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based index for API payload
  const [totalPages, setTotalPages] = useState(0);

  // State for search parameters
  // Initial state should match the default values in SearchForm
  const [currentSearchParams, setCurrentSearchParams] = useState({
    name: "",      // For Full Name
    refCode: "",   // For Account No
    number: "",    // For Meter Num
    branchCode: "",
    priceCode: "",
    modelCode: "",
    installed: "",
    cancelled: "",
  });

  // States for managing tab visibility (from your original code) - keep if still relevant for rendering tabs
  const [showCustomerTab, setshowCustomerTab] = useState(false);
  const [showConnection, setConnectionTab] = useState(false);
  const [showVendingTab, setVendingTab] = useState(false);
  const [showarrearTab, setshowarrearTab] = useState(false);
  const [showmaintaintab, setshowmaintaintab] = useState(false);
  const [showfreeissue, setshowfreeissue] = useState(false);
  const [showcancellation, setshowcancellation] = useState(false);

  // Set initial active tab and load its content
  useEffect(() => {
    setshowCustomerTab(true); // Assuming 'customer-event' is the default active tab
  }, []);

  // Use useCallback to memoize fetchTableData,
  // preventing unnecessary re-creations and issues with useEffect dependencies
  const fetchTableData = useCallback(async () => {
    // Check for cookies before making the API call
    const cookieString = document.cookie;
    if (!cookieString) {
      console.warn("No cookies found. Redirecting to /auth.login.");
      if (typeof window !== 'undefined') {
        window.location.href = "/auth.login";
      }
      return;
    }

    const formData = new URLSearchParams();
    formData.append("ACTION", "1");
    
    // Append search parameters from state
    Object.entries(currentSearchParams).forEach(([key, value]) => {
      // Only append non-empty values to avoid sending empty strings if not needed by API
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    });

    // Sending PAGE_INDEX as 1-based since your API response `pageIndex: "1"` suggests it expects 1-based.
    formData.append("PAGE_INDEX", (pageIndex + 1).toString());

    try {
      console.log("Initiating API request to /api/customer-exchange with payload:", formData.toString());
      const response = await fetch("/api/customer-exchange", {
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

      console.log("API Response Status:", response.status, response.statusText);
      console.log("API Response Headers:", Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            console.error("Authentication failed or forbidden. Redirecting to /auth.login.");
            if (typeof window !== 'undefined') {
                window.location.href = "/auth.login";
            }
            return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response Data:", data);

      setTableData(data.rows || []);
      setTotalRecords(parseInt(data.total) || 0);
      setTotalPages(parseInt(data.totalPages) || 0);
      setPageIndex(parseInt(data.pageIndex) - 1 || 0);
    } catch (error) {
      console.error("Error fetching table data:", error);
      setTableData([]);
      setTotalRecords(0);
      setTotalPages(0);
      setPageIndex(0); // Reset page index on error
    }
  }, [pageIndex, currentSearchParams]); // Add currentSearchParams to dependencies

  // Effect to trigger data fetching
  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]); // Depend on fetchTableData (which is memoized by useCallback)

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage);
    }
  };

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      // Optional: If you want to clear search results when input is empty,
      // you might trigger a new fetch with default params.
      // For now, it just prevents setting a non-numeric page.
      return;
    }
    const page = parseInt(value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1);
    }
  };

  // Function to handle search submission from SearchForm
  const handleSearchSubmit = (params) => {
    // When a new search is performed, reset page index to 0
    setPageIndex(0);
    setCurrentSearchParams(params);
  };

  return (
    <>
      <div className="p-2 md:p-6"> {/* Added padding for the whole content */}
        {/* Render the SearchForm component */}
        <SearchForm onSearch={handleSearchSubmit} />
      </div>

      <div className="p-2 md:p-6"> {/* Added padding for the table and tabs */}
        {/* Render the CustomerTable component */}
        <CustomerTable
          tableData={tableData}
          totalRecords={totalRecords}
          pageIndex={pageIndex}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handlePageInputChange={handlePageInputChange}
          fetchTableData={fetchTableData} // Pass fetchTableData for refresh/input blur
        />

        {/* Tabs Navigation - Horizontal scroll on small screens */}
        <div className="flex overflow-x-auto pb-2 mb-4 gap-2 sm:gap-4">
          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 whitespace-nowrap ${
              activeTab === "customer-event"
                ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("customer-event");
              setshowCustomerTab(true);
              setConnectionTab(false);
              setVendingTab(false);
              setshowarrearTab(false);
              setshowmaintaintab(false);
              setshowfreeissue(false);
              setshowcancellation(false);
            }}
          >
            Customer Event
          </button>

          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 whitespace-nowrap ${
              activeTab === "connection"
                ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("connection");
              setConnectionTab(true);
              setshowCustomerTab(false);
              setVendingTab(false);
              setshowarrearTab(false);
              setshowmaintaintab(false);
              setshowfreeissue(false);
              setshowcancellation(false);
            }}
          >
            Connection
          </button>

          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 whitespace-nowrap ${
              activeTab === "vending"
                ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("vending");
              setVendingTab(true);
              setConnectionTab(false);
              setshowCustomerTab(false);
              setshowarrearTab(false);
              setshowmaintaintab(false);
              setshowcancellation(false);
              setshowfreeissue(false);
            }}
          >
            Vending
          </button>

          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 whitespace-nowrap ${
              activeTab === "arrear-contract"
                ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("arrear-contract");
              setVendingTab(false);
              setConnectionTab(false);
              setshowCustomerTab(false);
              setshowarrearTab(true);
              setshowmaintaintab(false);
              setshowfreeissue(false);
              setshowcancellation(false);
            }}
          >
            Arrear Contract
          </button>

          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 whitespace-nowrap ${
              activeTab === "maintenance-token"
                ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("maintenance-token");
              setVendingTab(false);
              setConnectionTab(false);
              setshowCustomerTab(false);
              setshowarrearTab(false);
              setshowmaintaintab(true);
              setshowfreeissue(false);
              setshowcancellation(false);
            }}
          >
            Maintenance Token
          </button>

          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 whitespace-nowrap ${
              activeTab === "free-issue-list"
                ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("free-issue-list");
              setVendingTab(false);
              setConnectionTab(false);
              setshowCustomerTab(false);
              setshowarrearTab(false);
              setshowmaintaintab(false);
              setshowfreeissue(true);
              setshowcancellation(false);
            }}
          >
            Free Issue List
          </button>

          <button
            className={`px-3 sm:px-4 py-1 sm:py-2 whitespace-nowrap ${
              activeTab === "cancellation"
                ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("cancellation");
              setVendingTab(false);
              setConnectionTab(false);
              setshowCustomerTab(false);
              setshowarrearTab(false);
              setshowmaintaintab(false);
              setshowfreeissue(false);
              setshowcancellation(true);
            }}
          >
            Cancellation
          </button>

          <button
            className="px-3 sm:px-4 py-1 sm:py-2 bg-[#FF9900] text-white rounded ml-auto whitespace-nowrap"
            onClick={fetchTableData} // This refresh button now also considers current search params
          >
            Refresh
          </button>
        </div>

        {/* Dynamic Tab Content */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          {/* Render the specific tab component based on activeTab state */}
          {activeTab === "customer-event" && <Customereventtab />}
          {activeTab === "connection" && <Connectiontab />}
          {activeTab === "vending" && <VendingTab />}
          {activeTab === "arrear-contract" && <ArrearTabe />}
          {activeTab === "maintenance-token" && <Maintaintokentab />}
          {activeTab === "free-issue-list" && <Freeissuetab />}
          {activeTab === "cancellation" && <CancellationTab />}
        </div>
      </div>
    </>
  );
}

export default Content;