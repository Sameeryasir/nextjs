"use client";
import { useState } from "react";
import MeterTypeTable from "./MeterTypeTable";
import BranchTypeTable from "./BranchTypeTable";
import MeterphaseTable from "./MeterphaseTable";
import MeterReplacementReason from "./MeterReplacementReason";
import Replacemaxpowertable from "./Replacemaxpowertable";
import Clearcreditreasontable from "./Clearcreditreasontable";
import ClearTamperReason from "./ClearTamperReason";
import CancelCustomerReason from "./CancelCustomerReason";
import VendingRefundedReason from "./VendingRefundedReason";

const dataItems = [
  "Meter Type",
  "Branch Type",
  "Meter Phase",
  "Meter Replacement Reason",
  "Replace Max.Power Reason",
  "Clear Credit Reason",
  "Clear Tamper Reason",
  "Cancel Customer Reason",
  "Vending Refunded Reason",
  "Vending Cancellation Reason",
  "Billing Mode",
  "Bussiness Type for Stock",
  "Declaration Type for Warehouse",
  "Repairing Type for Warehouse",
  "Connection Code",
  "Reason of Free Issue",
  "Reason of Arrearing Reverse",
  "Reason of Installing Meter",
  "Reason of Uninstalling Meter",
  "Account Type Of Arrear",
  "Sponsor Group",
  "Sponsor Sector",
  "Restor Reason for Customer",
  "Sources Type",
  "Bank Information",
  "Recharge Reverse",
  "Project Type",
  "Auth Key",
  "Tariff Type",
  "House Type",
  "Room",
  "Credentials",
 
];

export default function Dictionary() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="flex justify-between w-full">
      <div className=" w-full bg-white p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold">Data List</h2>
          <button
            onClick={() => {
              console.log("Refreshing...");
            }}
            className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded hover:cursor-pointer"
          >
            Refresh
          </button>
        </div>

        {/* Content panel */}
        <div className="flex h-full">
          {/* Left list panel */}
          <div className="w-1/3 bg-gray-100 overflow-y-auto">
            {dataItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-4 py-1 cursor-pointer hover:bg-gray-200 ${
                  selectedItem === item ? " font-bold" : ""
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <svg
                  className="w-4 h-4 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 1l7.997 4.884v8.232L10 19l-7.997-4.884V5.884z" />
                </svg>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>

          {/* Right display panel */}
          <div className="w-2/3 ml-10">
            {selectedItem === "Meter Type" && <MeterTypeTable />}
            {selectedItem === "Branch Type" && <BranchTypeTable />}{" "}
            {selectedItem === "Meter Phase" && <MeterphaseTable />}
            {selectedItem === "Meter Replacement Reason" && (
              <MeterReplacementReason />
            )}
            {selectedItem === "Replace Max.Power Reason" && (
              <Replacemaxpowertable />
            )}
            {selectedItem === "Clear Credit Reason" && (
              <Clearcreditreasontable />
            )}
            {selectedItem === "Clear Tamper Reason" && <ClearTamperReason />}
            {selectedItem === "Cancel Customer Reason" && (
              <CancelCustomerReason />
            )}
            {selectedItem === "Vending Refunded Reason" && <VendingRefundedReason/>}
          </div>
        </div>
      </div>
    </div>
  );
}
