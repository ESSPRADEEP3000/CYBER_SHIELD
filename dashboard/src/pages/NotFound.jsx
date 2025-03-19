// 

import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <h1 className="text-9xl font-extrabold text-green-500 animate-pulse">404</h1>
      <p className="text-2xl text-green-300 mt-4">Page Not Found</p>
      <a
        href="/"
        className="mt-8 text-xl text-green-400 hover:underline transition duration-300"
      >
        Return Home
      </a>
    </div>
  );
};

export default NotFound;
