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

function CustomerType() {
  const router = useRouter();

  // State for the "New" dialog (AllocateInformationdialog)
  const [showAllocateDialog, setshowAllocateDialog] = useState(false);

  // State for fetched Price List table data
  const [priceRecords, setPriceRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state for the table

  console.log("CustomerType: Component rendered.");

  // Fetch data on component mount
  useEffect(() => {
    console.log("CustomerType: useEffect triggered for initial data fetch.");
    fetchPriceData();
  }, []); // Empty dependency array means it runs once on mount

  const fetchPriceData = async () => {
    console.log("CustomerType: fetchPriceData called.");
    setIsLoading(true); // Start loading

    const formData = new URLSearchParams();
    formData.append("ACTION", "1");
    formData.append("PAGE_INDEX", "-1"); // As per API payload for fetching all records

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("CustomerType: Sending payload (object for clarity):", payloadObject);

    try {
      // Use the reusable apiFetcher function
      const data = await apiFetcher("/api/prices", "POST", formData, router);

      setPriceRecords(data.rows || []);
      // API returns empty 'total', so use array length
      setTotalRecords(data.rows?.length || 0);
      console.log("CustomerType: Data fetched successfully. Records received:", data.rows?.length, "Total records:", data.total);

    } catch (error) {
      console.error("CustomerType: Error fetching data via apiFetcher:", error);
      setPriceRecords([]);
      setTotalRecords(0);
      // apiFetcher already handles redirection if cookies are missing.
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Data for the second table (Tariff Version List) - This remains static unless an API is provided
  // Renamed from tariffVersionData to avoid confusion with dynamic priceRecords
  const staticTariffVersionData = [
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

  const handleRefresh = () => {
    console.log("CustomerType: Refresh button clicked. Fetching data.");
    fetchPriceData(); // Trigger data fetch
  };

  return (
    <div className="w-full bg-white mt-10">
      <div className="flex flex-col pb-4 mb-4 gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            Price List
          </h1>
          <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={handleRefresh}
              className="bg-[#FF9900] hover:cursor-pointer text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition text-sm sm:text-base"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link href={"/base_information/customertype/newcustomertype"}>
              <button className="hover:cursor-pointer bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md hover:bg-[#FF9900] transition w-auto sm:w-[110px]">
                <Plus size={16} />
                <span className="hidden sm:inline">New</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* First Table: Price List (dynamic) */}
      <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
        <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex gap-1 sm:gap-2">
              {/* Pagination controls are functionally disabled for PAGE_INDEX: -1 */}
              <ChevronFirst className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-not-allowed" />
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-not-allowed" />
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-not-allowed" />
              <ChevronLast className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-not-allowed" />
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
              <span className="text-gray-600 whitespace-nowrap">
                Total {totalRecords} Records
              </span>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <span className="text-gray-600 whitespace-nowrap">
                Record 1-{totalRecords}
              </span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-600 whitespace-nowrap">
                Turn To Page
              </span>
              <input
                type="text"
                className="w-8 sm:w-12 border rounded px-1 sm:px-2 py-1 text-center text-xs sm:text-sm"
                value="1" // Always show 1 as there's no actual pagination
                readOnly // Make it read-only
                disabled // Disable it
              />
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 cursor-not-allowed" />
            </div>
          </div>
        </div>

        {/* Table itself */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-center p-4">Loading price data...</div>
          ) : (
            <table className="w-full min-w-[800px] sm:min-w-0">
              <thead className="bg-[#FF9900] text-white">
                <tr>
                  <th className="p-2 sm:p-3 text-left">Code</th>
                  <th className="p-2 sm:p-3 text-left">Description</th>
                  <th className="p-2 sm:p-3 text-left">Model Name</th>
                  <th className="p-2 sm:p-3 text-left">Activate</th>
                </tr>
              </thead>
              <tbody>
                {priceRecords.length > 0 ? (
                  priceRecords.map((row, index) => (
                    <tr
                      key={index}
                      className="hover:bg-[#FFE2B7] cursor-pointer border-gray-200"
                    >
                      <td className="p-2 sm:p-3">{row.Code || "-"}</td>
                      <td className="p-2 sm:p-3">{row.Description || "-"}</td>
                      <td className="p-2 sm:p-3">{row.ModelName || "-"}</td>
                      <td className="p-2 sm:p-3">
                        {row.Actived === "Y" ? (
                          <span className="text-green-600 font-semibold">
                            Active
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            Inactive
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">
                      No price records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Second Table: Tariff Version List (Static, as no API was provided for this) */}
      {showAllocateDialog && (
        <AllocateInformationdialog
          onClose={() => setshowAllocateDialog(false)}
        />
      )}{" "}
    </div>
  );
}

export default CustomerType;
