"use client";
import React, { useState, useEffect, useCallback } from "react";

// Import the search and table components
import SearchForm from "./sections/SearchForm";
import CustomerTable from "./sections/CustomerTable";

function Content() {
  const [tableData, setTableData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0); // 0-based index for API payload
  const [totalPages, setTotalPages] = useState(0);

  // State for search parameters
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

  // Use useCallback to memoize fetchTableData
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
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    });

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
      setPageIndex(0);
    }
  }, [pageIndex, currentSearchParams]);

  // Effect to trigger data fetching
  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage);
    }
  };

  const handlePageInputChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      return;
    }
    const page = parseInt(value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1);
    }
  };

  // Function to handle search submission from SearchForm
  const handleSearchSubmit = (params) => {
    setPageIndex(0);
    setCurrentSearchParams(params);
  };

  return (
    <>
      <div className="p-2 md:p-6">
        <SearchForm onSearch={handleSearchSubmit} />
      </div>

      <div className="p-2 md:p-6">
        <CustomerTable
          tableData={tableData}
          totalRecords={totalRecords}
          pageIndex={pageIndex}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handlePageInputChange={handlePageInputChange}
          fetchTableData={fetchTableData}
        />
      </div>
    </>
  );
}

export default Content;