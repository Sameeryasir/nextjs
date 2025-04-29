import React from "react";

function CancellationTab() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[1000px]">
        <thead className="bg-[#FF9900] text-white">
          <tr>
            <th className="p-2 sm:p-3 text-left">Cancel</th>
            <th className="p-2 sm:p-3 text-left">Cancel Reason</th>
            <th className="p-2 sm:p-3 text-left">Cancel Operator</th>
            <th className="p-2 sm:p-3 text-left">Restore Date</th>
            <th className="p-2 sm:p-3 text-left">Restore Reason</th>
            <th className="p-2 sm:p-3 text-left">Restore Operator</th>
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

export default CancellationTab;
