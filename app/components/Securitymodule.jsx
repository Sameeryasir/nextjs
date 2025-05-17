import Securitycard from "./Securitycard";

export default function DonutChart() {
  const total = 2000000000;
  const progress = 89054310;
  const percentage = ((progress / total) * 100).toFixed(2);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * (1 - progress / total);

  return (
    <div className="max-w-5xl px-4 py-6 flex flex-col md:flex-row items-center gap-8">
      {/* Security Card */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start">
        <Securitycard />
      </div>

      {/* Donut Chart */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        {/* Heading OUTSIDE the donut container */}
        <h2 className="text-center text-lg font-bold mb-4">
          Security Module Management
        </h2>

        <div className="relative w-[80vw] max-w-[250px] aspect-square">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="fill-none stroke-gray-200"
              strokeWidth="10"
            />
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="fill-none stroke-blue-500"
              strokeWidth="10"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Centered Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-sm text-gray-500">20000000</div>
            <div className="text-lg font-semibold text-gray-800">
              2025-06-29
            </div>
            <div className="text-sm text-gray-500">22:00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
