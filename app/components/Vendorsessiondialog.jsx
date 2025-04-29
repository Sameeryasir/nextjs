import React from "react";
import { X, Minimize, Maximize } from "lucide-react";

function Vendorsessiondialog() {
  const details = [
    { label: "User Code", value: "2247" },
    { label: "Start Time", value: "2025-02-14 16:21:38" },
    { label: "Close Time", value: "--" },
    { label: "Operator", value: "--" },
    { label: "Bank", value: "Bank 1-Sonelec93422342342" },
    { label: "", value: "10000.00 KMF / 0.00 KMF" },
    { label: "Total AMT", value: "10000.00 KMF / 0 KMF" },
    { label: "Bank AMT", value: "0.00 KMF / 10000 KMF" },
    { label: "Status", value: "End" },
  ];

  return (
    <div className="max-w-md mx-auto mt-10  overflow-hidden">
      {/* Header with icons */}
    
      <div className="flex justify-between items-center bg-gray-100 px-4 py-3 ">
        <h3 className="font-medium text-gray-700">Session Details</h3>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {details.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="font-medium">{item.label}</span>
            <span className="text-right">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vendorsessiondialog;
