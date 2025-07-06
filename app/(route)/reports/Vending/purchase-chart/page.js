"use client";
import React, { useState } from "react";
import Pruchasechartdialogue1 from "./pruchasechartdialogue1";
import Purchasechartdialogue2 from "./purchasechartdialogue2";
import {
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  Menu,
  X,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogOpen1, setIsDialogOpen1] = useState(false);
        const [isDialogOpen2, setIsDialogOpen2] = useState(false);


  const [activeTab, setActiveTab] = useState("Shema");

  const tableData = [
    {
      branch: "Main Branch",
      projects: "Solar Upgrade",
      extraPay: 120.5,
      stampTax: 15.2,
      sale: 850.0,
    },
    {
      branch: "East Branch",
      projects: "Energy Audit",
      extraPay: 80.0,
      stampTax: 10.0,
      sale: 760.5,
    },
    {
      branch: "North Branch",
      projects: "Wind Installation",
      extraPay: 200.0,
      stampTax: 25.5,
      sale: 950.75,
    },
  ];

  const handleReload = () => window.location.reload();

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fee Report");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "fee-report.xlsx");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Rapport détaillé des transactions quotidiennes
        </h1>
        <div className="flex gap-4">
          <button
            onClick={handleReload}
            className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105 hover:cursor-pointer"
          >
            Refresh
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-[#FF9900] text-white rounded-md w-40 transition hover:brightness-105 hover:cursor-pointer"
          >
            Print
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="max-w-7xl w-full text-left mb-14 space-y-8 px-4">
        {/* Area Inputs */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Select Area
          </label>
          <div className="flex flex-wrap gap-2 w-full max-w-4xl">
            <input
              type="text"
              className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setIsDialogOpen1(true)}
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:cursor-pointer"
            >
              ...
            </button>
            {isDialogOpen1 && (
              <Pruchasechartdialogue1 onClose={() => setIsDialogOpen1(false)} />
            )}
            <button
              type="button"
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Projects Inputs */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Projects
          </label>
          <div className="flex flex-wrap gap-2 w-full max-w-4xl">
            <input
              type="text"
              className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setIsDialogOpen2(true)}
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center hover:cursor-pointer"
            >
              ...
            </button>
            {isDialogOpen2 && (
              <Purchasechartdialogue2 onClose={() => setIsDialogOpen2(false)} />
            )}
            <button
              type="button"
              className="w-[50px] h-[40px] bg-[#FF9900] text-white rounded-md flex items-center justify-center"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Installed */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Installed
          </label>
          <select className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="install">Install</option>
            <option value="uninstall">Uninstall</option>
          </select>
        </div>

        {/* Date Inputs */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Date From
          </label>
          <input
            type="date"
            className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <label className="w-full sm:w-32 text-sm font-medium text-gray-700">
            Date To
          </label>
          <input
            type="date"
            className="w-full sm:w-[375px] p-2 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Search */}
        <div className="flex justify-center sm:justify-start sm:pl-40">
          <button className="w-full sm:w-40 py-2 bg-[#FF9900] text-white rounded-md transition hover:brightness-105">
            Search
          </button>
        </div>
      </div>

      {/* Tabs + Content */}
      <div className="overflow-x-auto">
        <div className="p-4 w-full mx-auto">
          <div className="flex gap-6 mb-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("Shema")}
              className={`pb-2 font-medium ${
                activeTab === "Shema"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-black"
              }`}
            >
              Shema
            </button>
            <button
              onClick={() => setActiveTab("Donnees")}
              className={`pb-2 font-medium ${
                activeTab === "Donnees"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-black"
              }`}
            >
              Donnees
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden h-[400px] flex relative">
            {activeTab === "Shema" ? (
              <>
                <div className="w-1/3 border-r border-gray-300 p-4 space-y-2 overflow-y-auto">
                  {[
                    { label: "Création des clients", color: "bg-sky-600" },
                    { label: "kWh acheté", color: "bg-lime-500" },
                    { label: "Energie acheté", color: "bg-orange-600" },
                    { label: "Ponction branchement", color: "bg-yellow-400" },
                    { label: "Branchement uniquement", color: "bg-sky-400" },
                    { label: "Timbre", color: "bg-teal-300" },
                    { label: "Taxes", color: "bg-orange-400" },
                    { label: "PRIME FIXE", color: "bg-gray-700" },
                    { label: "RER+TEOM+RTI", color: "bg-cyan-300" },
                    { label: "Cout de service", color: "bg-sky-700" },
                    { label: "Montant TTC sans timbre", color: "bg-green-600" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className={`w-4 h-1 rounded-sm ${item.color}`} />
                      <span className="text-sm text-gray-800">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Right panel with dropdown */}
                <div className="w-2/3 relative p-4">
                  <div className="absolute top-2 right-2">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => setIsDialogOpen((prev) => !prev)}
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-sm flex items-center justify-center"
                      >
                        <Menu size={16} />
                      </button>

                      {isDialogOpen && (
                        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-50">
                          <div className="py-1 text-sm text-gray-800">
                            <button
                              onClick={() => {
                                window.print();
                                setIsDialogOpen(false);
                              }}
                              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                            >
                              Print chart
                            </button>
                            <button
                              onClick={() => alert("Download PNG")}
                              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                            >
                              Download PNG image
                            </button>
                            <button
                              onClick={() => alert("Download JPEG")}
                              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                            >
                              Download JPEG image
                            </button>
                            <button
                              onClick={() => alert("Download PDF")}
                              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                            >
                              Download PDF document
                            </button>
                            <button
                              onClick={() => alert("Download SVG")}
                              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                            >
                              Download SVG vector image
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[1200px]">
                  <thead className="bg-[#FF9900] text-white text-sm font-medium tracking-wide">
                    <tr>
                      <th className="p-3 text-left whitespace-nowrap">
                        Création des clients
                      </th>
                      <th className="p-3 text-left whitespace-nowrap">
                        kWh acheté
                      </th>
                      <th className="p-3 text-left whitespace-nowrap">
                        Energie acheté
                      </th>
                      <th className="p-3 text-left whitespace-nowrap">
                        Ponction branchement
                      </th>
                      <th className="p-3 text-left whitespace-nowrap">
                        Branchement uniquement
                      </th>
                      <th className="p-3 text-left whitespace-nowrap">
                        Timbre
                      </th>
                      <th className="p-3 text-left whitespace-nowrap">Taxes</th>
                      <th className="p-3 text-left whitespace-nowrap">
                        PRIME FIXE
                      </th>
                      <th className="p-3 text-left whitespace-nowrap">
                        RER+TEOM+RTI
                      </th>
                      <th className="p-3 text-left whitespace-nowrap">
                        Cout de service
                      </th>
                      <th className="p-3 text-left whitespace-nowrap">
                        Montant TTC sans timbre
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
