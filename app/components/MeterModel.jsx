"use client";
import React, { useState, useEffect } from "react";
import {
  RefreshCw,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Plus,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import AllocateInformationdialog from "./AllocateInformationdialog";
import { apiFetcher } from "../utils/apiFetcher"; // Import the new reusable function

function MeterModel() {
  const router = useRouter();

  // State for search form inputs
  const [type, setType] = useState("");
  const [phase, setPhase] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  // State for fetched table data
  const [meterModelRecords, setMeterModelRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  // State for the "New" dialog (AllocateInformationdialog)
  const [showAllocateDialog, setshowAllocateDialog] = useState(false);

  console.log("MeterModel: Component rendered.");

  useEffect(() => {
    console.log("MeterModel: useEffect triggered.");
    fetchMeterModelData();
  }, []); // Empty dependency array means it runs once on mount. Search triggered by button.

  const fetchMeterModelData = async () => {
    console.log("MeterModel: fetchMeterModelData called.");

    const formData = new URLSearchParams();
    formData.append("ACTION", "1");
    if (type) formData.append("type", type);
    if (phase) formData.append("phase", phase);
    if (code) formData.append("code", code);
    if (description) formData.append("description", description);
    formData.append("PAGE_INDEX", "-1"); // As per API payload for fetching all records

    const payloadObject = {};
    for (const pair of formData.entries()) {
      payloadObject[pair[0]] = pair[1];
    }
    console.log("MeterModel: Prepared payload (object for clarity):", payloadObject);

    try {
      // Use the reusable apiFetcher function
      const data = await apiFetcher("/api/meter-model", "POST", formData, router);
      
      setMeterModelRecords(data.rows || []);
      setTotalRecords(data.rows?.length || 0);
      console.log("MeterModel: Data fetched successfully. Records received:", data.rows?.length);

    } catch (error) {
      console.error("MeterModel: Error fetching data via apiFetcher:", error);
      setMeterModelRecords([]);
      setTotalRecords(0);
      // The apiFetcher already handles redirection if cookies are missing.
      // Other errors will just result in an empty table and console error.
    }
  };

  const handleRefresh = () => {
    console.log("MeterModel: Refresh button clicked. Fetching data.");
    fetchMeterModelData();
  };

  const handleSearch = () => {
    console.log("MeterModel: Search button clicked. Fetching data with current filters.");
    fetchMeterModelData();
  };

  return (
    <div className="w-full bg-white mt-10">
      <div className="flex flex-col pb-4 mb-4 gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            Meter Model List
          </h1>
          <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={handleRefresh}
              className="bg-[#FF9900] hover:cursor-pointer text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md transition text-sm sm:text-base"
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              className="hover:cursor-pointer bg-[#FF9900] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center gap-1 sm:gap-2 shadow-md hover:bg-[#FF9900] transition w-auto sm:w-[110px]"
              onClick={() => setshowAllocateDialog(true)}
            >
              <Plus size={16} />
              <span className="hidden sm:inline ">New</span>
            </button>
            {showAllocateDialog && (
              <AllocateInformationdialog
                onClose={() => setshowAllocateDialog(false)}
              />
            )}
          </div>
        </div>

        {/* Search Conditions */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label htmlFor="type" className="text-sm text-gray-500">
              Meter Type:
            </label>
            <input
              type="text"
              id="type"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="phase" className="text-sm text-gray-500">
              Phase:
            </label>
            <input
              type="text"
              id="phase"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={phase}
              onChange={(e) => setPhase(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="code" className="text-sm text-gray-500">
              Code:
            </label>
            <input
              type="text"
              id="code"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="description" className="text-sm text-gray-500">
              Description:
            </label>
            <input
              type="text"
              id="description"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
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
        <div className="p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex gap-1 sm:gap-2">
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
                value="1"
                readOnly
                disabled
              />
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 cursor-not-allowed" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] sm:min-w-0">
            <thead className="bg-[#FF9900] text-white">
              <tr>
                <th className="p-2 sm:p-3 text-left">Code</th>
                <th className="p-2 sm:p-3 text-left">Description</th>
                <th className="p-2 sm:p-3 text-left">Meter Type</th>
                <th className="p-2 sm:p-3 text-left">Phase</th>
                <th className="p-2 sm:p-3 text-left">Voltage</th>
                <th className="p-2 sm:p-3 text-left">Current</th>
                <th className="p-2 sm:p-3 text-left">Max.Current</th>
                <th className="p-2 sm:p-3 text-left">Use Age Limit</th>
                <th className="p-2 sm:p-3 text-left">TI</th>
                <th className="p-2 sm:p-3 text-left">Init. Value</th>
                <th className="p-2 sm:p-3 text-left">Max.Power</th>
              </tr>
            </thead>
            <tbody>
              {meterModelRecords.length > 0 ? (
                meterModelRecords.map((row, index) => {
                  const amrParts = row.AMRModel ? row.AMRModel.split('|') : [];
                  const ti = amrParts[0] || '-';
                  const initValue = amrParts[1] || '-';
                  const maxPower = amrParts[2] || '-';

                  return (
                    <tr
                      key={index}
                      className="hover:bg-[#FFE2B7] cursor-pointer border-gray-200"
                    >
                      <td className="p-2 sm:p-3">{row.Code || "-"}</td>
                      <td className="p-2 sm:p-3">{row.Description || "-"}</td>
                      <td className="p-2 sm:p-3">{row.MeterType || "-"}</td>
                      <td className="p-2 sm:p-3">{row.Phase || "-"}</td>
                      <td className="p-2 sm:p-3">{row.Ub || "-"}</td>
                      <td className="p-2 sm:p-3">{row.Current || "-"}</td>
                      <td className="p-2 sm:p-3">{row.MaxCurrent || "-"}</td>
                      <td className="p-2 sm:p-3">{row.Years || "-"}</td>
                      <td className="p-2 sm:p-3">{ti}</td>
                      <td className="p-2 sm:p-3">{initValue}</td>
                      <td className="p-2 sm:p-3">{maxPower}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="11" className="text-center p-4 text-gray-500">
                    No meter models found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MeterModel;
