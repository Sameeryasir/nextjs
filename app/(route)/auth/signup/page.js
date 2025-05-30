import Image from "next/image";
import React from "react";

function Page() {
  return (
    <div className="mt-10 flex items-center justify-center ">
      <div className="flex w-full max-w-5xl h-full md:h-[80vh]  overflow-hidden">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">SECDAIS</h2>
          <p className="text-gray-500 mb-6">Create your free account</p>

          <form className="space-y-4">
            <div>
              <label className="text-gray-700 font-medium text-sm">
                Full name
              </label>
              <input
                type="text"
                placeholder="Ruben"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium text-sm">Email</label>
              <input
                type="email"
                placeholder="Ruben@gmail.com"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-700 font-medium text-sm">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="****************"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ✈️
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white font-semibold py-2 rounded-md hover:bg-blue-800 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="mt-20 relative hidden md:block md:w-1/2 h-[600px]">
          <Image
            src="/images/tower.jpg"
            alt="Signup illustration"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
