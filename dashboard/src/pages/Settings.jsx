// import React, { useEffect, useState } from "react";
// import { getApps, generateApiKey } from "../services/apiService";

// const Settings = () => {
//   const [userDetails, setUserDetails] = useState({
//     username: "John Doe", // Example static user data, replace with actual API call if needed
//     email: "john.doe@example.com",
//   });
//   const [apps, setApps] = useState([]);
//   const [apiKey, setApiKey] = useState(null); // Store the newly generated API Key for a specific app
//   const [selectedAppId, setSelectedAppId] = useState(null); // Track which app's API key to show
//   const [token] = useState(localStorage.getItem("token"));

//   useEffect(() => {
//     const fetchApps = async () => {
//       try {
//         const data = await getApps(token);
//         setApps(data);
//       } catch (error) {
//         console.error("Error fetching apps:", error.message);
//       }
//     };

//     if (token) {
//       fetchApps();
//     } else {
//       console.error("No token available. Please log in.");
//     }
//   }, [token]);

//   const handleGenerateApiKey = async (appId) => {
//     try {
//       const data = await generateApiKey(appId, token);
//       setApiKey(data.apiKey);
//       setSelectedAppId(appId);
//     } catch (error) {
//       console.error("Error generating API key:", error.message);
//     }
//   };

//   const handleCopyApiKey = (apiKey) => {
//     if (apiKey) {
//       navigator.clipboard.writeText(apiKey);
//       alert("API Key copied to clipboard!");
//     }
//   };

//   const handleCopyAppId = (appId) => {
//     if (appId) {
//       navigator.clipboard.writeText(appId);
//       alert("App ID copied to clipboard!");
//     }
//   };

//   return (
//     <div className="container mx-auto p-8 max-w-5xl bg-gray-50 rounded-xl shadow-lg">
//       <h1 className="text-4xl font-semibold text-center mb-8 text-gray-900">Settings</h1>

//       {/* User Account Details */}
//       <section className="bg-white p-8 rounded-lg shadow-xl mb-8 border-l-4 border-blue-500">
//         <h2 className="text-3xl font-semibold mb-4 text-gray-800">User Account</h2>
//         <p className="text-lg text-gray-700 mb-2 truncate">
//           <strong className="text-gray-900">Username:</strong> {userDetails.username}
//         </p>
//         <p className="text-lg text-gray-700 truncate">
//           <strong className="text-gray-900">Email:</strong> {userDetails.email}
//         </p>
//       </section>

//       {/* API Section */}
//       <section className="bg-white p-8 rounded-lg shadow-xl border-l-4 border-green-500">
//         <h2 className="text-3xl font-semibold mb-4 text-gray-800">API Management</h2>
//         <div>
//           <h3 className="text-2xl font-semibold mb-4 text-gray-700">Your Applications</h3>
//           {apps.length > 0 ? (
//             apps.map((app) => (
//               <div
//                 key={app._id}
//                 className="bg-gray-50 p-6 rounded-lg shadow-md mb-6 border-l-4 border-indigo-500"
//               >
//                 <h4 className="text-xl font-semibold text-gray-800 mb-4 truncate">{app.appName}</h4>

//                 {/* Display the existing API Key */}
//                 <div className="mb-4">
//                   <p className="text-lg text-gray-700 truncate">
//                     <strong className="text-gray-900">API Key:</strong> {app.apiKey}
//                   </p>
//                   <button
//                     onClick={() => handleCopyApiKey(app.apiKey)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-700 transition duration-300 ease-in-out"
//                   >
//                     Copy API Key
//                   </button>
//                 </div>

//                 {/* Display the App ID */}
//                 <div className="mb-4">
//                   <p className="text-lg text-gray-700 truncate">
//                     <strong className="text-gray-900">App ID:</strong> {app._id}
//                   </p>
//                   <button
//                     onClick={() => handleCopyAppId(app._id)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-700 transition duration-300 ease-in-out"
//                   >
//                     Copy App ID
//                   </button>
//                 </div>

//                 {/* Button to generate a new API key */}
//                 <button
//                   onClick={() => handleGenerateApiKey(app._id)}
//                   className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-700 transition duration-300 ease-in-out"
//                 >
//                   Generate New API Key
//                 </button>

//                 {/* Display the newly generated API Key */}
//                 {selectedAppId === app._id && apiKey && (
//                   <div className="mt-4">
//                     <p className="text-lg text-gray-700 truncate">
//                       <strong className="text-gray-900">Your New API Key:</strong> {apiKey}
//                     </p>
//                     <button
//                       onClick={() => handleCopyApiKey(apiKey)}
//                       className="bg-green-600 text-white px-4 py-2 rounded-md mt-2 hover:bg-green-700 transition duration-300 ease-in-out"
//                     >
//                       Copy New API Key
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="text-lg text-gray-700">No apps available. Please add one!</p>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Settings;



// import React, { useEffect, useState } from "react";
// import { getApps, generateApiKey } from "../services/apiService";

// const Settings = () => {
//   const [userDetails] = useState({
//     username: "admin", // Example static user data; replace with an API call if needed
//     email: "admin@example.com",
//   });
//   const [apps, setApps] = useState([]);
//   const [apiKey, setApiKey] = useState(null);
//   const [selectedAppId, setSelectedAppId] = useState(null);
//   const [token] = useState(localStorage.getItem("token"));

//   useEffect(() => {
//     const fetchApps = async () => {
//       try {
//         const data = await getApps(token);
//         setApps(data);
//       } catch (error) {
//         console.error("Error fetching apps:", error.message);
//       }
//     };

//     if (token) {
//       fetchApps();
//     } else {
//       console.error("No token available. Please log in.");
//     }
//   }, [token]);

//   const handleGenerateApiKey = async (appId) => {
//     try {
//       const data = await generateApiKey(appId, token);
//       setApiKey(data.apiKey);
//       setSelectedAppId(appId);
//     } catch (error) {
//       console.error("Error generating API key:", error.message);
//     }
//   };

//   const handleCopyApiKey = (apiKey) => {
//     if (apiKey) {
//       navigator.clipboard.writeText(apiKey);
//       alert("API Key copied to clipboard!");
//     }
//   };

//   const handleCopyAppId = (appId) => {
//     if (appId) {
//       navigator.clipboard.writeText(appId);
//       alert("App ID copied to clipboard!");
//     }
//   };

//   return (
//     <div className="container mx-auto p-8 max-w-5xl bg-gray-900 rounded-xl shadow-lg">
//       <h1 className="text-4xl font-semibold text-center mb-8 text-green-400">
//         Settings
//       </h1>

//       {/* User Account Details */}
//       <section className="bg-gray-800 p-8 rounded-lg shadow-xl mb-8 border-l-4 border-blue-500">
//         <h2 className="text-3xl font-semibold mb-4 text-green-300">
//           User Account
//         </h2>
//         <p className="text-lg text-gray-300 mb-2 truncate">
//           <strong className="text-white">Username:</strong> {userDetails.username}
//         </p>
//         <p className="text-lg text-gray-300 truncate">
//           <strong className="text-white">Email:</strong> {userDetails.email}
//         </p>
//       </section>

//       {/* API Management Section */}
//       <section className="bg-gray-800 p-8 rounded-lg shadow-xl border-l-4 border-green-500">
//         <h2 className="text-3xl font-semibold mb-4 text-green-300">
//           API Management
//         </h2>
//         <div>
//           <h3 className="text-2xl font-semibold mb-4 text-green-200">
//             Your Applications
//           </h3>
//           {apps.length > 0 ? (
//             apps.map((app) => (
//               <div
//                 key={app._id}
//                 className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 border-l-4 border-green-500"
//               >
//                 <h4 className="text-xl font-semibold text-green-200 mb-4 truncate">
//                   {app.appName}
//                 </h4>

//                 {/* Existing API Key */}
//                 <div className="mb-4">
//                   <p className="text-lg text-gray-300 truncate">
//                     <strong className="text-white">API Key:</strong> {app.apiKey}
//                   </p>
//                   <button
//                     onClick={() => handleCopyApiKey(app.apiKey)}
//                     className="bg-green-600 text-white px-4 py-2 rounded-md mt-2 hover:bg-green-700 transition duration-300 ease-in-out"
//                   >
//                     Copy API Key
//                   </button>
//                 </div>

//                 {/* App ID */}
//                 <div className="mb-4">
//                   <p className="text-lg text-gray-300 truncate">
//                     <strong className="text-white">App ID:</strong> {app._id}
//                   </p>
//                   <button
//                     onClick={() => handleCopyAppId(app._id)}
//                     className="bg-green-600 text-white px-4 py-2 rounded-md mt-2 hover:bg-green-700 transition duration-300 ease-in-out"
//                   >
//                     Copy App ID
//                   </button>
//                 </div>

//                 {/* Generate New API Key */}
//                 <button
//                   onClick={() => handleGenerateApiKey(app._id)}
//                   className="bg-green-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-700 transition duration-300 ease-in-out"
//                 >
//                   Generate New API Key
//                 </button>

//                 {/* Display New API Key */}
//                 {selectedAppId === app._id && apiKey && (
//                   <div className="mt-4">
//                     <p className="text-lg text-gray-300 truncate">
//                       <strong className="text-white">
//                         Your New API Key:
//                       </strong>{" "}
//                       {apiKey}
//                     </p>
//                     <button
//                       onClick={() => handleCopyApiKey(apiKey)}
//                       className="bg-green-600 text-white px-4 py-2 rounded-md mt-2 hover:bg-green-700 transition duration-300 ease-in-out"
//                     >
//                       Copy New API Key
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="text-lg text-gray-300">
//               No apps available. Please add one!
//             </p>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Settings;


import React, { useEffect, useState } from "react";
import { getApps, generateApiKey } from "../services/apiService";
import { Clipboard, ClipboardCheck } from "lucide-react";

const Settings = () => {
  const [userDetails] = useState({
    username: "admin",
    email: "admin@example.com",
  });
  const [apps, setApps] = useState([]);
  const [apiKey, setApiKey] = useState(null);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [copied, setCopied] = useState(null);
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const data = await getApps(token);
        setApps(data);
      } catch (error) {
        console.error("Error fetching apps:", error.message);
      }
    };

    if (token) fetchApps();
  }, [token]);

  const handleGenerateApiKey = async (appId) => {
    try {
      const data = await generateApiKey(appId, token);
      setApiKey(data.apiKey);
      setSelectedAppId(appId);
    } catch (error) {
      console.error("Error generating API key:", error.message);
    }
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="max-w-6xl my-6 mx-auto p-6 bg-gray-900 rounded-xl shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6 text-green-400">
        Settings
      </h1>

      {/* User Account Section */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold text-center mb-4 text-green-300">
          ADMIN
        </h2>
        {/* <p className="text-gray-300">
          <strong className="text-white">Username:</strong> {userDetails.username}
        </p>
        <p className="text-gray-300">
          <strong className="text-white">Email:</strong> {userDetails.email}
        </p> */}

      </section>

      {/* API Management Section */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <h2 className="text-xl font-semibold  mb-4 text-green-300">
          API Management
        </h2>
          
        {apps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apps.map((app) => (
              <div key={app._id} className="bg-gray-700 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-green-200 mb-4">
                  {app.appName}
                </h3>

                {/* API Key Display */}
                <div
                  className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-lg cursor-pointer mb-2"
                  onClick={() => handleCopy(app.apiKey, `api-${app._id}`)}
                >
                  <span className="text-gray-300 truncate">
                    <strong className="text-white">API Key:</strong> {app.apiKey}
                  </span>
                  {copied === `api-${app._id}` ? (
                    <ClipboardCheck className="text-green-400 w-5 h-5" />
                  ) : (
                    <Clipboard className="text-gray-400 hover:text-green-400 w-5 h-5" />
                  )}
                </div>

                {/* App ID Display */}
                <div
                  className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-lg cursor-pointer"
                  onClick={() => handleCopy(app._id, `id-${app._id}`)}
                >
                  <span className="text-gray-300 truncate">
                    <strong className="text-white">App ID:</strong> {app._id}
                  </span>
                  {copied === `id-${app._id}` ? (
                    <ClipboardCheck className="text-green-400 w-5 h-5" />
                  ) : (
                    <Clipboard className="text-gray-400 hover:text-green-400 w-5 h-5" />
                  )}
                </div>

                {/* Generate New API Key */}
                <button
                  onClick={() => handleGenerateApiKey(app._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-green-700 transition duration-300 ease-in-out"
                >
                  Generate New API Key
                </button>

                {/* Display New API Key */}
                {selectedAppId === app._id && apiKey && (
                  <div
                    className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-lg mt-2 cursor-pointer"
                    onClick={() => handleCopy(apiKey, "new-api")}
                  >
                    <span className="text-gray-300 truncate">
                      <strong className="text-white">New API Key:</strong> {apiKey}
                    </span>
                    {copied === "new-api" ? (
                      <ClipboardCheck className="text-green-400 w-5 h-5" />
                    ) : (
                      <Clipboard className="text-gray-400 hover:text-green-400 w-5 h-5" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">No apps available. Please add one!</p>
        )}
      </section>
    </div>
  );
};

export default Settings;