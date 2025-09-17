"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

// Import sections and tabs
import SearchForm from "../sections/SearchForm";
import CustomerTable from "../sections/CustomerTable";
import Customereventtab from "./Customereventtab";
import Connectiontab from "./Connectiontab";
import VendingTab from "./VendingTab";
import ArrearTabe from "./ArrearTabe";
import Maintaintokentab from "./Maintaintokentab";
import Freeissuetab from "./Freeissuetab";
import CancellationTab from "./CancellationTab";
import RegisterCustomerForm from "./RegisterCustomerForm";

function Content() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("customer-event");
  const [tableData, setTableData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);

  const [currentSearchParams, setCurrentSearchParams] = useState({
    name: "",
    refCode: "",
    number: "",
    branchCode: "",
    priceCode: "",
    modelCode: "",
    installed: "",
    cancelled: "",
  });

  const [tabVisibility, setTabVisibility] = useState({
    "customer-event": true,
    "connection": false,
    "vending": false,
    "arrear-contract": false,
    "maintenance-token": false,
    "free-issue-list": false,
    "cancellation": false,
  });

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    const newVisibility = {};
    Object.keys(tabVisibility).forEach(key => {
      newVisibility[key] = key === tabName;
    });
    setTabVisibility(newVisibility);
  };

  const fetchTableData = useCallback(async () => {
    const cookieString = document.cookie;
    if (!cookieString) {
      if (typeof window !== 'undefined') window.location.href = "/auth/login";
      return;
    }
    const formData = new URLSearchParams();
    formData.append("ACTION", "1");
    Object.entries(currentSearchParams).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    formData.append("PAGE_INDEX", (pageIndex + 1).toString());
    try {
      const response = await fetch("/api/customer-exchange", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: cookieString,
        },
        body: formData.toString(),
      });
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          if (typeof window !== 'undefined') window.location.href = "/auth/login";
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
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
  }, [pageIndex, currentSearchParams, router]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage);
    }
  };

  const handlePageInputChange = (e) => {
    const page = parseInt(e.target.value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setPageIndex(page - 1);
    }
  };

  const handleSearchSubmit = (params) => {
    setPageIndex(0);
    setCurrentSearchParams(params);
  };

  const tabs = [
    { id: "customer-event", label: "Customer Event" },
    { id: "connection", label: "Connection" },
    { id: "vending", label: "Vending" },
    { id: "arrear-contract", label: "Arrear Contract" },
    { id: "maintenance-token", label: "Maintenance Token" },
    { id: "free-issue-list", label: "Free Issue List" },
    { id: "cancellation", label: "Cancellation" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {isRegisterFormVisible ? (
        <RegisterCustomerForm onClose={() => setIsRegisterFormVisible(false)} />
      ) : (
        <>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4">Customer Management</h2>
            <SearchForm 
              onSearch={handleSearchSubmit}
              onRegisterClick={() => setIsRegisterFormVisible(true)}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center border-b border-gray-200 mb-4">
              <nav className="flex overflow-x-auto gap-2 sm:gap-4">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`px-3 sm:px-4 py-2 whitespace-nowrap font-semibold text-sm transition-colors ${
                      activeTab === tab.id
                        ? "text-[#FF9900] border-b-2 border-[#FF9900]"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
              <button
                className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:brightness-105 transition-colors flex items-center gap-2"
                onClick={fetchTableData}
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>

            <div className="mt-4">
              {tabVisibility["customer-event"] && <Customereventtab />}
              {tabVisibility["connection"] && <Connectiontab />}
              {tabVisibility["vending"] && <VendingTab />}
              {tabVisibility["arrear-contract"] && <ArrearTabe />}
              {tabVisibility["maintenance-token"] && <Maintaintokentab />}
              {tabVisibility["free-issue-list"] && <Freeissuetab />}
              {tabVisibility["cancellation"] && <CancellationTab />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Content;
