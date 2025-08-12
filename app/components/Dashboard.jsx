"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetcher } from "../utils/apiFetcher" // Ensure this path is correct
import DashboardCharts from "./DashboardCharts"; // We will create this component next

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

// Helper function to parse HTML and extract data
const parseDashboardData = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    
    const data = {};
    
    // Extract stats
    const dataDivs = doc.querySelectorAll("#data_n");
    if (dataDivs.length >= 4) {
        data.clientsActifs = dataDivs[0]?.querySelector("h1")?.textContent.trim();
        data.transactionsJr = dataDivs[1]?.querySelector("h1")?.textContent.trim();
        data.ventesJr = dataDivs[2]?.querySelector("h3")?.textContent.trim();
        data.energieVendueJr = dataDivs[3]?.querySelector("h3")?.textContent.trim();
    }

    // Extract chart data
    const scripts = doc.querySelectorAll("script");
    scripts.forEach(script => {
        const scriptContent = script.innerHTML;
        if (scriptContent.includes("myChart")) {
            const labelsMatch = scriptContent.match(/labels:\s*\[(.*?)\]/);
            const dataMatch = scriptContent.match(/data:\s*\[(.*?)\]/);
            if (labelsMatch && dataMatch) {
                data.salesByChannel = {
                    labels: labelsMatch[1].replace(/'/g, "").split(','),
                    data: dataMatch[1].replace(/'/g, "").split(',').map(Number)
                };
            }
        }
        if (scriptContent.includes("yourChart")) {
            const labelsMatch = scriptContent.match(/labels:\s*\[(.*?)\]/);
            const dataMatch = scriptContent.match(/data:\s*\[(.*?)\]/);
             if (labelsMatch && dataMatch) {
                data.marketShare = {
                    labels: labelsMatch[1].replace(/'/g, "").split(','),
                    data: dataMatch[1].replace(/'/g, "").split(',').map(Number)
                };
            }
        }
    });

    return data;
};


function DashboardPage() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Since the response is HTML, we'll handle the fetch directly
        const cookieString = document.cookie;
        if (!cookieString || cookieString.trim() === "") {
            router.push("/auth/login");
            return;
        }

        const response = await fetch('/api/desktop-main', { // Assumes a rewrite for this path
            method: 'POST',
            headers: { 'Cookie': cookieString }
        });
        
        const htmlText = await response.text();

        if (!response.ok) {
            throw new Error(`API Error: ${htmlText}`);
        }
        
        const parsedData = parseDashboardData(htmlText);
        setDashboardData(parsedData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading Dashboard...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="CLIENTS ACTIFS" value={dashboardData?.clientsActifs} iconBg="bg-cyan-200" />
        <StatCard title="TRANSACTIONS / Jr" value={dashboardData?.transactionsJr} iconBg="bg-blue-200" />
        <StatCard title="VENTES / Jr" value={dashboardData?.ventesJr} iconBg="bg-green-200" />
        <StatCard title="ENERGIE VENDUE / Jr" value={dashboardData?.energieVendueJr} iconBg="bg-yellow-200" />
      </div>

      {/* Charts */}
      {dashboardData && <DashboardCharts salesData={dashboardData.salesByChannel} marketData={dashboardData.marketShare} />}
    </div>
  );
}

const StatCard = ({ title, value, iconBg }) => (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 flex items-center">
        <div className={`p-3 rounded-full ${iconBg}`}>
            {/* You can add icons here later if you want */}
        </div>
        <div className="ml-4">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value || 'N/A'}</p>
        </div>
    </div>
);

export default DashboardPage;
