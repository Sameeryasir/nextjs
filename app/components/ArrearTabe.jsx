import React from 'react'

function ArrearTabe() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[1000px]">
        <thead className="bg-[#FF9900] text-white">
          <tr>
            <th className="p-2 sm:p-3 text-left">Code</th>
            <th className="p-2 sm:p-3 text-left">Date</th>
            <th className="p-2 sm:p-3 text-left">Project</th>
            <th className="p-2 sm:p-3 text-left">Arrear</th>
            <th className="p-2 sm:p-3 text-left">Paid</th>
            <th className="p-2 sm:p-3 text-left">Acc.Balance</th>
            <th className="p-2 sm:p-3 text-left">Pay Value</th>
            <th className="p-2 sm:p-3 text-left">Paying Date</th>{" "}
            <th className="p-2 sm:p-3 text-left">Status</th>
            <th className="p-2 sm:p-3 text-left">Operator</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="p-2 sm:p-3">2025-04-18</td>
            <td className="p-2 sm:p-3">Update</td>
            <td className="p-2 sm:p-3">Customer changed address</td>
            <td className="p-2 sm:p-3">1450</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ArrearTabe