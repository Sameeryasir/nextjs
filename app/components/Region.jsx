"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetcher } from "../utils/apiFetcher"; // Ensure path is correct
import { RefreshCw, Folder as FolderIcon, FolderOpen, ChevronRight } from "lucide-react";

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


// Recursive Folder Component
const Folder = ({ node }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(node.state === "open");
  const [children, setChildren] = useState(node.children || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChildren = async () => {
    if (children.length > 0) return; // Don't re-fetch if already loaded

    setIsLoading(true);
    setError(null);
    const payload = new URLSearchParams();
    // --- FIX APPLIED HERE ---
    // Updated payload to match the provided form data for fetching child nodes
    payload.append("ACTION", "1");
    payload.append("tableName", node.attributes.tableName);
    payload.append("rootNode", "0");
    payload.append("rootCode", node.id); // The parent's ID is used as the rootCode
    payload.append("level", (node.attributes.level + 1).toString());
    payload.append("id", node.id);
    // --- END FIX ---

    try {
        const data = await apiFetcher("/api/region-exchange", "POST", payload, router);
        if (!Array.isArray(data)) {
            throw new Error("Invalid data format for child nodes.");
        }
        setChildren(data);
    } catch (err) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

  const handleToggle = () => {
    const newOpenState = !isOpen;
    setIsOpen(newOpenState);
    if (newOpenState && children.length === 0) {
      fetchChildren();
    }
  };

  const hasChildren = node.state === 'closed' || (children && children.length > 0);

  return (
    <div className="ml-4">
      <div
        className="cursor-pointer flex items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100"
        onClick={handleToggle}
      >
        {hasChildren && <ChevronRight size={16} className={`mr-2 transition-transform ${isOpen ? 'rotate-90' : ''}`} />}
        <span className="mr-2 text-lg text-orange-500">{isOpen ? <FolderOpen size={18}/> : <FolderIcon size={18}/>}</span>
        <span className="text-sm text-gray-800">{node.text}</span>
        {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-orange-500 ml-2"></div>}
      </div>
      {isOpen && children.length > 0 && (
        <div className="ml-6 border-l-2 border-orange-100 pl-2">
          {children.map((childNode) => (
            <Folder key={childNode.id} node={childNode} />
          ))}
        </div>
      )}
      {error && <div className="ml-12 text-xs text-red-500">{error}</div>}
    </div>
  );
};


// Main Page Component
export default function RegionPage() {
  const router = useRouter();
  const [rootNodes, setRootNodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const fetchRootNodes = async () => {
    setIsLoading(true);
    setApiError(null);
    const payload = new URLSearchParams();
    // This payload is for the initial top-level items
    payload.append("ACTION", "1");
    payload.append("tableName", "AREA");
    payload.append("rootNode", "0");
    payload.append("rootCode", "");
    payload.append("level", "-1");
    payload.append("id", "-1");

    try {
        const data = await apiFetcher("/api/region-exchange", "POST", payload, router);
        if (!Array.isArray(data)) {
            throw new Error("Invalid data format received from server.");
        }
        setRootNodes(data);
    } catch (error) {
        setApiError(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRootNodes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        {apiError && <ErrorPopup message={apiError} onClose={() => setApiError(null)} />}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Branch Structure</h1>
                <button 
                    onClick={fetchRootNodes}
                    disabled={isLoading}
                    className="px-4 py-2 bg-[#FF9900] text-white rounded-md hover:brightness-105 transition-colors w-40 flex items-center justify-center gap-2 disabled:bg-gray-400"
                >
                    <RefreshCw size={16} />
                    {isLoading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>
            
            <div className="space-y-1">
                {isLoading ? (
                    <p className="text-gray-500">Loading structure...</p>
                ) : (
                    rootNodes.map(node => <Folder key={node.id} node={node} />)
                )}
            </div>
        </div>
    </div>
  );
}
