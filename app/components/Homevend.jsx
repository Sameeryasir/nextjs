import React from "react";
import SearchCustomer from "./SearchCustomer";
import Arrear from "./Arrear";
import TransactionCalculator from "./Calculator";
import VendingDetails from "./Vendingdetails";

function Homevend() {
  return (
    <div className="flex gap-8 p-4">
      {/* Left Column */}
      <div className="w-1/3 min-w-[300px] flex flex-col gap-3 border-r border-gray-200 pr-3">
        {/* Compact SearchCustomer wrapper with medium font weight */}
        <div className="[&>*]:text-sm [&>*]:font-medium [&>div]:p-2 [&_input]:py-1 [&_button]:py-1 [&_button]:text-sm">
          <SearchCustomer />
        </div>

        <TransactionCalculator />
      </div>

      {/* Right Column */}
      <div className="flex-1 flex flex-col pl-4 gap-10">
        <Arrear />
        <div className="h-px bg-gray-200 my-2"></div> {/* Customizable line */}
        <VendingDetails />
      </div>
    </div>
  );
}

export default Homevend;
