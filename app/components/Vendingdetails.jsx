import React from "react";

function VendingDetails() {
  return (
    <div className="space-y-4 text-mid">
      <h2 className="font-semibold text-gray-700 text-center">
        Vending Details
      </h2>

      {/* First Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-2">
        {/* Left Column */}
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2">
            <span className="text-gray-600">Calc. KWh</span>
            <span className="font-semibold">0.00</span>
          </div>

          <div className="flex justify-between items-center p-2">
            <span className="text-gray-600">Cost of KWh</span>
            <span className="font-semibold">0.00</span>
          </div>

          <div className="flex justify-between items-center p-2">
            <span className="text-gray-600">Fee to pay</span>
            <span className="font-semibold">0.00</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2">
            <span className="text-gray-600">Charge KWh</span>
            <span className="font-semibold">0.00</span>
          </div>

          <div className="flex justify-between items-center p-2">
            <span className="text-gray-600">Arrear To Pay</span>
            <span className="font-semibold">0.00</span>
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-gray-700 text-center">
        Payment Details
      </h2>

      {/* Second Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-2">
        {/* Left Column */}
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2">
            <span className="text-gray-600">Total amount</span>
            <span className="font-semibold text-blue-600">0.00000</span>
          </div>

          <div className="flex justify-between items-center p-2">
            <span className="text-gray-600">Tax</span>
            <span className="font-semibold text-gray-700">0.00000</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2">
            <span className="text-gray-600">Payable</span>
            <span className="font-semibold text-green-600">0.00000</span>
          </div>

          <div className="flex justify-between items-center p-2">
            <span className="text-gray-600">Stamp Tax</span>
            <span className="font-semibold text-gray-700">0.00000</span>
          </div>
        </div>

        {/* Payment Section - Now spanning full width with payment method and amount received side by side */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex justify-between items-center p-1">
            <span className="text-gray-600">Payment</span>
            <div className="relative w-full pl-4">
              <select className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-0.5 px-1.5 pr-5  text-sm">
                <option>Cash</option>
                <option>Card</option>
                <option>Mobile</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-500">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center p-2">
            <span className="text-gray-600">Amount Received</span>
            <input
              type="text"
              className="bg-gray-50 border border-gray-200 text-gray-700 py-1 px-2 rounded text-right font-semibold w-24 text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Change - Full width below */}
        <div className="md:col-span-2 flex justify-between items-center p-2">
          <span className="text-gray-600">Change</span>
          <span className="font-semibold">0.00</span>
        </div>
      </div>
    </div>
  );
}

export default VendingDetails;
