import React from "react";

const PostizHero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-[#ef2222] mb-6">
          Your ultimate social media scheduling tool
        </h1>

        <p className="text-xl text-[#ef2222] mb-12">
          Postiz offers everything you need to manage your social media posts,
          build an audience, capture leads, and grow your business.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
            Start Free Trial
          </button>
          <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-8 rounded-lg shadow-md transition duration-300">
            See Features
          </button>
        </div>
      </div>

      <div className="mt-20 flex flex-wrap justify-center gap-8">
        {/* Facebook */}
        <div className="bg-white p-4 rounded-lg shadow-md w-24 h-24 flex flex-col items-center justify-center hover:scale-105 transition-transform">
          <img
            src="/icons/facebook.svg"
            alt="Facebook"
            className="w-10 h-10 mb-2"
          />
          <div className="text-sm font-medium text-indigo-700">Facebook</div>
        </div>

        {/* Instagram */}
        <div className="bg-white p-4 rounded-lg shadow-md w-24 h-24 flex flex-col items-center justify-center hover:scale-105 transition-transform">
          <img
            src="/icons/instagram.svg"
            alt="Instagram"
            className="w-10 h-10 mb-2"
          />
          <div className="text-sm font-medium text-indigo-700">Instagram</div>
        </div>

        {/* Twitter */}
        <div className="bg-white p-4 rounded-lg shadow-md w-24 h-24 flex flex-col items-center justify-center hover:scale-105 transition-transform">
          <img
            src="/icons/twitter.svg"
            alt="Twitter"
            className="w-10 h-10 mb-2"
          />
          <div className="text-sm font-medium text-indigo-700">Twitter</div>
        </div>

        {/* LinkedIn */}
        <div className="bg-white p-4 rounded-lg shadow-md w-24 h-24 flex flex-col items-center justify-center hover:scale-105 transition-transform">
          <img
            src="/icons/linkedin.svg"
            alt="LinkedIn"
            className="w-10 h-10 mb-2"
          />
          <div className="text-sm font-medium text-indigo-700">LinkedIn</div>
        </div>

        {/* Pinterest */}
        <div className="bg-white p-4 rounded-lg shadow-md w-24 h-24 flex flex-col items-center justify-center hover:scale-105 transition-transform">
          <img
            src="/icons/pinterest.svg"
            alt="Pinterest"
            className="w-10 h-10 mb-2"
          />
          <div className="text-sm font-medium text-indigo-700">Pinterest</div>
        </div>
      </div>
    </div>
  );
};

export default PostizHero;
