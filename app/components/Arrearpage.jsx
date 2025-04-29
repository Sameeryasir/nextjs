export default function Arrear() {
  return (
    <div className="lg:ml-34 p-4 md:p-6 font-poppins text-[14px] leading-none">
      {/* Header with buttons - Stack on small screens */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3 md:gap-0">
        <h1 className="text-xl md:text-2xl font-normal tracking-wide text-black">
          PROJECTS
        </h1>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="bg-[#FF9800] text-white px-3 py-1 md:px-4 md:py-2 rounded hover:bg-[#E68900] transition font-normal text-sm md:text-base w-full md:w-auto">
            REFRESH
          </button>
          <button className="bg-[#FF9800] text-white px-3 py-1 md:px-4 md:py-2 rounded hover:bg-[#E68900] transition font-normal text-sm md:text-base w-full md:w-auto">
            NEW
          </button>
        </div>
      </div>

      {/* Searching Condition Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-base md:text-lg font-normal mb-3 md:mb-4 tracking-wide text-black">
          SEARCHING CONDITION
        </h2>

        {/* Stack elements on small screens */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 text-black gap-3 md:gap-0">
          <div className="flex items-center gap-1 flex-wrap">
            {/* Navigation arrows */}
            <div className="flex gap-1">
              <button className="p-1 border border-gray-300 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="p-1 border border-gray-300 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <span className="text-sm md:text-base ml-1">
              Total 13 Records, Record 0-10, Page 1/2
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
            {/* Search bar - full width on mobile */}
            <div className="relative w-full md:w-40">
              <input
                type="text"
                placeholder="Search..."
                className="pl-2 pr-2 py-1 border border-gray-300 rounded text-sm w-full"
              />
              {/* Green arrow */}
              <div className="absolute right-0 top-0 h-full w-6 flex items-center justify-center bg-green-500 rounded-r">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            <button className="bg-gray-200 text-black px-3 py-1 rounded border border-gray-300 font-normal text-sm md:text-base w-full sm:w-auto">
              TURN TO PAGE
            </button>
          </div>
        </div>

        {/* Projects Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#FF9800] text-white">
                <th className="p-2 font-normal text-center w-16 md:w-20">
                  CODE
                </th>
                <th className="p-2 font-normal min-w-[120px] md:w-64">
                  DESCRIPTION
                </th>
                <th className="p-2 font-normal min-w-[100px] md:w-48">
                  PROJECT TYPE
                </th>
                <th className="p-2 font-normal min-w-[90px] md:w-40">
                  PAY METHOD
                </th>
                <th className="p-2 font-normal text-center w-16 md:w-24">
                  SHARED
                </th>
                <th className="p-2 font-normal min-w-[80px] md:w-32">ACTIVE</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(6)].map((_, i) => (
                <tr key={i} className="text-black">
                  <td className="p-2 text-center">⭐</td>
                  <td className="p-2 truncate">DETTE REGULARISATION</td>
                  <td className="p-2 truncate">FRAIS GENERAL</td>
                  <td className="p-2 truncate">PER TIMES(%)</td>
                  <td className="p-2 text-center">✔</td>
                  <td className="p-2 truncate">ADMIN</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 my-4"></div>

      {/* Version List Section */}
      <div>
        <h2 className="text-base md:text-lg font-normal mb-3 md:mb-4 tracking-wide text-black">
          VERSION LIST
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#FF9800] text-white">
                <th className="p-2 font-normal min-w-[120px] md:w-48">
                  STARTUP TIME
                </th>
                <th className="p-2 font-normal min-w-[80px] md:w-32">AMOUNT</th>
                <th className="p-2 font-normal min-w-[120px] md:w-48">
                  PAYING VALUE
                </th>
                <th className="p-2 font-normal min-w-[120px] md:w-48">
                  OPERATOR
                </th>
                <th className="p-2 font-normal min-w-[80px] md:w-32">ACTIVE</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-black">
                <td colSpan="5" className="p-2 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
