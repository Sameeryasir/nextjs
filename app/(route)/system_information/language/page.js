"use client";
import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import { apiFetcher } from "@/app/utils/apiFetcher"; // Import the reusable API fetcher

function Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true); // Loading state for the table
  const [languages, setLanguages] = useState([]); // State to store fetched language data
  const [totalRecords, setTotalRecords] = useState(0); // Total records will be based on array length

  console.log("Page (Language List): Component rendered.");

  // Fetch data on component mount
  useEffect(() => {
    console.log("Page (Language List): useEffect triggered for initial data fetch.");
    fetchLanguageData();
  }, []); // Empty dependency array means it runs once on mount

  const fetchLanguageData = async () => {
    console.log("Page (Language List): fetchLanguageData called.");
    setIsLoading(true); // Start loading

    const formData = new URLSearchParams();
    formData.append("ACTION", "1"); // As per API payload

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("Page (Language List): Sending payload (object for clarity):", payloadObject);

    try {
      // Use the reusable apiFetcher function
      const data = await apiFetcher("/api/languages", "POST", formData, router);

      setLanguages(data.rows || []);
      setTotalRecords(data.rows?.length || 0); // Total records is the count of rows received
      console.log("Page (Language List): Data fetched successfully. Records received:", data.rows?.length);

    } catch (error) {
      console.error("Page (Language List): Error fetching data via apiFetcher:", error);
      setLanguages([]);
      setTotalRecords(0);
      // apiFetcher already handles redirection if cookies are missing.
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleRefresh = () => {
    console.log("Page (Language List): Refresh button clicked. Fetching data.");
    fetchLanguageData(); // Trigger data fetch
  };

  return (
    <>
      <div className="w-full bg-white mt-10">
        {/* Loading spinner overlay */}
        {isLoading && (
          <div className="fixed inset-0 pl-40 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF9900]"></div>
          </div>
        )}
        {/* Main content, with opacity based on loading state */}
        <div
          className={`w-full bg-white mt-10 transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}
        >
          <div className="flex flex-col pb-4 mb-4 gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                Language List {/* Changed from Role List based on context */}
              </h1>
              <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
                <button
                  onClick={handleRefresh}
                  className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition text-sm sm:text-base"
                >
                  <RefreshCw size={16} />
                  <span className="hidden sm:inline hover:cursor-pointer">
                    Refresh
                  </span>
                </button>
                <Link href='/system_information/language/newlanguage'>
                  <button className="bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition w-auto sm:w-[110px]">
                    <Plus size={16} />
                    <span className="hidden sm:inline hover:cursor-pointer">
                      New
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow mb-4 sm:mb-6 overflow-x-auto">
            <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex gap-1 sm:gap-2">
                  {/* Pagination Controls - Disabled as API doesn't provide pagination */}
                  <ChevronFirst className="w-4 h-4 cursor-pointer text-gray-400" disabled />
                  <ChevronLeft className="w-4 h-4 cursor-pointer text-gray-400" disabled />
                  <ChevronRight className="w-4 h-4 text-gray-400 cursor-pointer" disabled />
                  <ChevronLast className="w-4 h-4 text-gray-400 cursor-pointer" disabled />
                </div>
                <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                  <span className="text-gray-600 whitespace-nowrap">
                    Total {totalRecords} Records
                  </span>
                  <span className="text-gray-600 hidden sm:inline">|</span>
                  <span className="text-gray-600 whitespace-nowrap">
                    Record 1-{totalRecords} {/* Display range based on total records */}
                  </span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-600 whitespace-nowrap">
                    Turn To Page
                  </span>
                  <input
                    type="text"
                    className="w-8 sm:w-12 border rounded px-1 sm:px-2 py-1 text-center text-xs sm:text-sm"
                    value="1" // Always 1 for non-paginated list
                    readOnly
                    disabled
                  />
                  <ChevronRight className="w-3 h-3 text-gray-400 cursor-not-allowed" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="text-center p-4">Loading language data...</div>
              ) : (
                <table className="w-full min-w-[800px] sm:min-w-0">
                  <thead className="bg-[#FF9900] text-white">
                    <tr>
                      <th className="p-2 sm:p-3 text-left">ID</th>
                      <th className="p-2 sm:p-3 text-left">Name</th>
                      <th className="p-2 sm:p-3 text-left">ISO Code</th>
                      <th className="p-2 sm:p-3 text-left">Activated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {languages.length > 0 ? (
                      languages.map((lang, index) => (
                        <tr key={lang.id_lang || index} className="hover:bg-gray-50 transition">
                          <td className="p-2 sm:p-3">{lang.id_lang || "-"}</td>
                          <td className="p-2 sm:p-3">{lang.name || "-"}</td>
                          <td className="p-2 sm:p-3">{lang.iso_code || "-"}</td>
                          <td className="p-2 sm:p-3">
                            {lang.active === "1" ? (
                              <span className="text-green-600 font-semibold">Yes</span>
                            ) : (
                              <span className="text-red-600 font-semibold">No</span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center p-4 text-gray-500">
                          No languages found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {/* Operator component (if it was intended to be part of this page, keep it) */}
          {/* <Operator /> */}
        </div>
      </div>
    </>
  );
}

export default Page;
