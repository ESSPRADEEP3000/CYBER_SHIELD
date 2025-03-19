// import React, { useEffect, useState } from "react";
// import { getApps } from "../services/apiService";
// import AddApp from "../components/Dashboard/AddApp";
// import { data, useNavigate } from "react-router-dom"; // Import useNavigate

// const Dashboard = () => {
//   const [apps, setApps] = useState([]);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate(); // Initialize useNavigate
//   const handleAppAdded = (newApp) => {
//     setApps((prevApps) => [...prevApps, newApp]);
//   };
//   useEffect(() => {
//     const fetchApps = async () => {
//       try {
//         const data = await getApps(token);
//         setApps(data || []);
//       } catch (error) {
//         console.error("Error fetching apps:", error);
//       }
//     };
//     fetchApps();
//   }, [handleAppAdded]);

//   const handleAppClick = (appId) => {
//     navigate(`/app-details/${appId}`); // Navigate to AppDetails page
//   };

//   const handleManualIPAnalysis = () => {
//     navigate("/indash"); // Navigate to the manual IP analysis page
//   };


//   return (
//     <div className="min-h-screen my-6 bg-gray-900 p-8">
//       <h1 className="text-3xl font-bold text-center text-green-400 mb-8">Dashboard</h1>
//       <AddApp token={token} onAppAdded={handleAppAdded} />
//       <h4 className="text-green-400 text-2xl my-6">Added Apps</h4>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
//         {apps.map((app) => (
//           <div
//             key={app._id}
//             className="bg-gray-800 p-6 rounded-lg shadow-xl border-l-4 border-green-500 cursor-pointer hover:scale-105 hover:bg-green-500 hover:text-black transition-transform duration-200"
//             onClick={() => handleAppClick(app._id)} // Handle click to navigate
//           >
//             <h3 className="font-medium text-xl text-green-200 mb-4">{app.appName}</h3>
//           </div>
//         ))}
//       </div>

//       {/* New Section for Manual IP Analysis */}
//       <div className="mt-8">
//         <h4 className="text-green-400 text-2xl mb-4">Manual IP Analysis</h4>
//         <button
//           onClick={handleManualIPAnalysis}
//           className="bg-green-500 text-center text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
//         >
//           Go to Manual IP Analysis
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState, useCallback } from "react";
import { getApps } from "../services/apiService";
import AddApp from "../components/Dashboard/AddApp";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleAppAdded = useCallback((newApp) => {
    setApps((prevApps) => [...prevApps, newApp]);
  }, []);

  useEffect(() => {
    const fetchApps = async () => {
      setLoading(true);
      try {
        const appsData = await getApps(token);
        setApps(appsData || []);
      } catch (err) {
        console.error("Error fetching apps:", err);
        setError("Failed to fetch apps. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, [token]);

  const handleAppClick = (appId) => {
    navigate(`/app-details/${appId}`);
  };

  const handleManualIPAnalysis = () => {
    navigate("/indash");
  };

  return (
    <div className="min-h-screen my-6 bg-gray-900 p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-green-400 mb-8">
        Dashboard
      </h1>

      {/* Add App Section */}
      <AddApp token={token} onAppAdded={handleAppAdded} />

      {/* Added Apps Section */}
      <div className="my-8">
        <h2 className="text-2xl text-green-400 mb-4">Added Apps</h2>
        {loading ? (
          <p className="text-green-200 text-center">Loading apps...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : apps.length === 0 ? (
          <p className="text-green-200 text-center">No apps added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => (
              <div
                key={app._id}
                className="bg-gray-800 p-6 rounded-lg shadow-xl border-l-4 border-green-500 cursor-pointer transform transition hover:scale-105 hover:bg-green-500 hover:text-black"
                onClick={() => handleAppClick(app._id)}
              >
                <h3 className="font-medium text-xl text-green-200 mb-2">
                  {app.appName}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Manual IP Analysis Section */}
      <div className="mt-12">
        <h2 className="text-2xl text-green-400 mb-4">Manual IP Analysis</h2>
        <button
          onClick={handleManualIPAnalysis}
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition duration-300 block mx-auto"
        >
          Go to Manual IP Analysis
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
