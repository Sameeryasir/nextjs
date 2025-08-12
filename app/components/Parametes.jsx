"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Save } from "lucide-react";

// A simple modal component for showing API errors
const ErrorPopup = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 className="text-xl font-bold mb-4 text-red-600">API Error</h2>
      <p className="mb-4 break-words">{message}</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-[#FF9900] text-white rounded-md hover:brightness-105 w-full"
      >
        Close
      </button>
    </div>
  </div>
);

// Helper to parse the HTML and extract form values
const parseParamsFromHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const params = {};
    
    doc.querySelectorAll('input, select').forEach(el => {
        const id = el.id;
        if (id) {
            if (el.type === 'checkbox') {
                params[id] = el.checked;
            } else {
                params[id] = el.value;
            }
        }
    });
    return params;
};


function ParametersPage() {
  const router = useRouter();
  const [params, setParams] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const fetchParameters = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
        const cookieString = document.cookie;
        if (!cookieString) {
            router.push("/auth/login");
            return;
        }
        const response = await fetch('/api/sys-parameters', { // Assumes rewrite in next.config.mjs
            method: 'POST',
            headers: { 'Cookie': cookieString }
        });
        const htmlText = await response.text();
        if (!response.ok) {
            throw new Error("Failed to fetch parameters");
        }
        const parsedData = parseParamsFromHTML(htmlText);
        setParams(parsedData);
    } catch (error) {
        setApiError(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchParameters();
  }, []);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setParams(prev => ({
        ...prev,
        [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    // This is where you would build and send the XML payload to the update endpoint
    console.log("Submitting data:", params);
    alert("Submit functionality is not fully implemented in this example.");
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading Parameters...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {apiError && <ErrorPopup message={apiError} onClose={() => setApiError(null)} />}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Parameters</h1>
          <div className="flex gap-4">
            <button onClick={handleSubmit} className="px-4 py-2 bg-[#000D35] text-white rounded-md hover:bg-opacity-90 transition-colors w-40 flex items-center justify-center gap-2">
              <Save size={16} />
              Submit
            </button>
            <button onClick={fetchParameters} className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:brightness-105 transition-colors w-40 flex items-center justify-center gap-2">
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>

        {/* Branch Information Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">Branch Information</h2>
            <div className="space-y-4">
                <InfoRow label="Branch Type" value={params.edtBranchType || 'N/A'} />
                <InfoRow label="Branch" value={`${params.edtBranchCode || ''} - ${params.edtBranchName || ''}`} />
                <InfoRow label="Contact" value={`${params.edtContact || ''} / ${params.edtPhone || ''} / ${params.edtMobile || ''}`} />
                <InfoRow label="Fax" value={params.edtFax || 'N/A'} />
                <InfoRow label="Address" value={params.edtAddress || 'N/A'} />
            </div>
        </div>

        {/* System Parameters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-3">System Parameters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <SelectInput id="edtParamTIME_ZONE" label="Time Zone" value={params.edtParamTIME_ZONE} onChange={handleInputChange} options={getTimezoneOptions()} />
                <TextInput id="edtParamCURRENCY" label="Currency Symbol" value={params.edtParamCURRENCY} onChange={handleInputChange} />
                <TextInput id="edtParamTRANS_INTERVAL" label="Transaction Interval (Minutes)" value={params.edtParamTRANS_INTERVAL} onChange={handleInputChange} type="number" />
                <TextInput id="edtParamTRANS_VALUES" label="Default Transaction Values" value={params.edtParamTRANS_VALUES} onChange={handleInputChange} />
                <TextInput id="edtParamCANCELDAY" label="Transaction Cancel Day" value={params.edtParamCANCELDAY} onChange={handleInputChange} type="number" />
                <TextInput id="edtParamREPORTDAY" label="Report Search Day" value={params.edtParamREPORTDAY} onChange={handleInputChange} type="number" />
                <TextInput id="edtParamDEFFAUTTI" label="Default TI for Meter" value={params.edtParamDEFFAUTTI} onChange={handleInputChange} />
                <TextInput id="edtParamSGCCODE" label="SGC" value={params.edtParamSGCCODE} onChange={handleInputChange} />
                <TextInput id="edtParamBANKNOTE_VALUES" label="Banknotes Value" value={params.edtParamBANKNOTE_VALUES} onChange={handleInputChange} />
                <TextInput id="edtParamCOIN_VALUES" label="Coin Value" value={params.edtParamCOIN_VALUES} onChange={handleInputChange} />
                <TextInput id="edtParamPWDEXPIRY" label="Password Expiry Day" value={params.edtParamPWDEXPIRY} onChange={handleInputChange} type="number" />
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <CheckboxInput id="edtParamUSE_FULLNAME" label="Use Fullname For Customer" checked={params.edtParamUSE_FULLNAME} onChange={handleInputChange} />
                    <CheckboxInput id="edtParamSHOW_TOKEN" label="Show Transaction Token" checked={params.edtParamSHOW_TOKEN} onChange={handleInputChange} />
                    <CheckboxInput id="edtParamBRANCHCODE_AUTO" label="Auto. Branch Code" checked={params.edtParamBRANCHCODE_AUTO} onChange={handleInputChange} />
                    <CheckboxInput id="edtParamPAYKWH" label="Vending by Kwh" checked={params.edtParamPAYKWH} onChange={handleInputChange} />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

// Helper components for form elements
const InfoRow = ({ label, value }) => (
    <div className="flex items-center">
        <label className="w-40 text-sm text-gray-600 shrink-0">{label}</label>
        <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
);

const TextInput = ({ id, label, value, onChange, type = "text" }) => (
    <div className="flex flex-col">
        <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">{label}</label>
        <input id={id} type={type} value={value || ''} onChange={onChange} className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-orange-400"/>
    </div>
);

const CheckboxInput = ({ id, label, checked, onChange }) => (
    <div className="flex items-center gap-2">
        <input id={id} type="checkbox" checked={checked || false} onChange={onChange} className="h-4 w-4 accent-[#FF9900] hover:cursor-pointer"/>
        <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
    </div>
);

const SelectInput = ({ id, label, value, onChange, options }) => (
    <div className="flex flex-col">
        <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">{label}</label>
        <select id={id} value={value || ''} onChange={onChange} className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-orange-400">
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

// Generates a list of timezones for the dropdown
const getTimezoneOptions = () => [
    "Africa/Abidjan", "Africa/Accra", "Africa/Algiers", "Africa/Cairo", "Africa/Casablanca", "Africa/Johannesburg", "Africa/Lagos", "Africa/Nairobi",
    "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "America/Sao_Paulo", "America/Toronto",
    "Asia/Baghdad", "Asia/Dubai", "Asia/Hong_Kong", "Asia/Kolkata", "Asia/Shanghai", "Asia/Singapore", "Asia/Tokyo",
    "Australia/Sydney", "Australia/Melbourne", "Australia/Perth",
    "Europe/Amsterdam", "Europe/Berlin", "Europe/London", "Europe/Moscow", "Europe/Paris", "Europe/Rome",
    "Etc/GMT-3" // Default from API
];

export default ParametersPage;
