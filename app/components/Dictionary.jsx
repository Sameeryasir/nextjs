"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, ListTree, ServerCrash, FileQuestion } from "lucide-react";
import { apiFetcher } from "../utils/apiFetcher"; // Ensure path is correct

// --- NEW: Dynamic DataTable Component ---
const DataTable = ({ selectedItem }) => {
    const router = useRouter();
    const [tableData, setTableData] = useState({ headers: [], rows: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectedItem) return;

        const fetchTableData = async () => {
            setIsLoading(true);
            setError(null);
            
            const payload = new URLSearchParams();
            payload.append("ACTION", "6");
            payload.append("tableName", selectedItem.attributes.tableName);
            payload.append("parentCode", "");

            try {
                // Since this response is HTML, we fetch it directly
                const cookieString = document.cookie;
                if (!cookieString) {
                    router.push("/auth/login");
                    return;
                }
                const response = await fetch('/api/dictionary-exchange', {
                    method: 'POST',
                    headers: { 'Cookie': cookieString, 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: payload.toString()
                });

                if (!response.ok) throw new Error("Failed to fetch table details.");
                
                const htmlText = await response.text();
                
                // Use a temporary element to safely parse the HTML fragment
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = `<table>${htmlText}</table>`;


                // Parse headers
                const headers = Array.from(tempDiv.querySelectorAll("thead.TableHeader td"))
                                     .map(td => td.textContent.trim())
                                     .filter(text => text && text.length > 0);

                // Parse rows
                const rows = Array.from(tempDiv.querySelectorAll("tr[name='dataListRow']")).map(tr => {
                    const cells = Array.from(tr.querySelectorAll("td"));
                    // The relevant data is in the cells after the icon and before the empty cell
                    const rowData = cells.slice(1, -1).map(cell => cell.textContent.trim());
                    return {
                        code: tr.getAttribute("code"),
                        data: rowData
                    };
                });
                
                setTableData({ headers, rows });

            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTableData();
    }, [selectedItem, router]);

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{selectedItem.text}</h2>
            <div className="overflow-x-auto border rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-[#000D35] to-[#FF9900] text-white h-12">
                            {tableData.headers.map(header => <th key={header} className="px-6 py-3 text-left font-semibold">{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={tableData.headers.length || 2} className="text-center p-6">Loading...</td></tr>
                        ) : error ? (
                             <tr><td colSpan={tableData.headers.length || 2} className="text-center p-6 text-red-500 flex items-center justify-center gap-2"><ServerCrash size={18}/> Error: {error}</td></tr>
                        ) : tableData.rows.length > 0 ? (
                            tableData.rows.map((row, index) => (
                                <tr key={row.code || index} className="hover:bg-orange-50 border-b">
                                    {row.data.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="px-6 py-4">{cell}</td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={tableData.headers.length || 2} className="text-center p-6 text-gray-500 flex items-center justify-center gap-2"><FileQuestion size={18}/> No data found for this item.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
// --- End of DataTable Component ---


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


function DictionaryPage() {
  const router = useRouter();
  const [dataItems, setDataItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const fetchDictionaryItems = async () => {
    setIsLoading(true);
    setApiError(null);
    const payload = new URLSearchParams();
    payload.append("ACTION", "4");
    payload.append("tableName", "rootNode");
    payload.append("rootNode", "1");
    payload.append("rootCode", "");
    payload.append("level", "-1");
    payload.append("id", "-1");

    try {
        const data = await apiFetcher("/api/dictionary-exchange", "POST", payload, router);
        if (!Array.isArray(data)) {
            throw new Error("Invalid data format received from server.");
        }
        setDataItems(data);
        if (data.length > 0) {
            setSelectedItem(data[0]);
        }
    } catch (error) {
        setApiError(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDictionaryItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        {apiError && <ErrorPopup message={apiError} onClose={() => setApiError(null)} />}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Data Dictionary</h1>
                <button 
                    onClick={fetchDictionaryItems}
                    disabled={isLoading}
                    className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:brightness-105 transition-colors w-40 flex items-center justify-center gap-2 disabled:bg-gray-400"
                >
                    <RefreshCw size={16} />
                    {isLoading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            <div className="flex" style={{ minHeight: '60vh' }}>
                {/* Left list panel */}
                <div className="w-1/3 border-r pr-4 overflow-y-auto">
                    {isLoading ? (
                        <p className="text-gray-500">Loading data list...</p>
                    ) : (
                        dataItems.map((item) => (
                            <div
                                key={item.id}
                                className={`flex items-center gap-3 px-3 py-2 cursor-pointer rounded-md mb-1 transition-colors ${
                                    selectedItem?.id === item.id ? "bg-orange-100 text-orange-700 font-semibold" : "hover:bg-gray-100"
                                }`}
                                onClick={() => setSelectedItem(item)}
                            >
                                <ListTree size={16} className={selectedItem?.id === item.id ? "text-orange-600" : "text-gray-400"} />
                                <span className="text-sm">{item.text}</span>
                            </div>
                        ))
                    )}
                </div>

                {/* Right display panel */}
                <div className="w-2/3 pl-6">
                    {selectedItem ? <DataTable selectedItem={selectedItem} /> : <div className="text-center text-gray-500">Select an item from the list to view its details.</div>}
                </div>
            </div>
        </div>
    </div>
  );
}

export default DictionaryPage;
