import React from "react";

function Arrear() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button className="px-4 py-2 font-medium text-gray-500 hover:text-gray-700">
          Customer Information
        </button>
        <button className="px-4 py-2 font-medium text-gray-500 hover:text-gray-700">
          Fees Details
        </button>
        <button className="px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600">
          Arrear Details
        </button>
      </div>

      {/* Table Container */}
      <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-white w-2/5">
                Description
              </th>
              <th className="text-left py-3 px-4 font-medium text-white w-1/5">
                Date
              </th>
              <th className="text-left py-3 px-4 font-medium text-white w-1/5">
                Balance
              </th>
              <th className="text-left py-3 px-4 font-medium text-white w-1/5">
                Payable
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t bg-gray-50">
              <td className="py-4 px-4 text-gray-500">-</td>
              <td className="py-4 px-4 text-gray-500">-</td>
              <td className="py-4 px-4 font-medium">0.00000</td>
              <td className="py-4 px-4 font-medium">0.00000</td>
            </tr>
            {/* Empty state if needed */}
            {/* <tr>
              <td colSpan="4" className="py-8 text-center text-gray-400">
                No arrear details available
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Arrear;
