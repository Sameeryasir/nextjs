import { XCircle } from "lucide-react";

export default function TpmDashboardPage() {
  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* How To Do Card */}
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
            How To Do?
          </h2>
          <p className="text-gray-500 text-center py-4">No Items</p>
        </div>

        {/* Downloads Card */}
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
            Downloads
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Service Components installations</li>
          </ul>
        </div>

        {/* System Check Card */}
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
            System Check
          </h2>
          <div className="flex items-center text-red-600 bg-red-50 border border-red-200 p-3 rounded-md">
            <XCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            <p className="font-medium">Initialize The Report Viewer Components Failed!</p>
          </div>
        </div>
      </div>
    </div>
  );
}