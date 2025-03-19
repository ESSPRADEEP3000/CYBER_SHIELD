// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AppList = () => {
//   const [apps, setApps] = useState([]);

//   useEffect(() => {
//     const fetchApps = async () => {
//       try {
//         const response = await axios.get("/api/apps");
//         setApps(response.data);
//       } catch (error) {
//         console.error("Error fetching apps:", error);
//       }
//     };

//     fetchApps();
//   }, []);

//   return (
//     <div>
//       <h2>Your Web Apps</h2>
//       <ul>
//         {apps.map((app, index) => (
//           <li key={index}>
//             {app.name} (API Key: {app.apiKey})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AppList;


import React, { useState, useEffect } from "react";
import axios from "axios";

const AppList = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await axios.get("/api/apps");
        setApps(response.data);
      } catch (error) {
        console.error("Error fetching apps:", error);
      }
    };

    fetchApps();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-green-400 mb-4">Your Web Apps</h2>
      <ul className="space-y-2">
        {apps.map((app, index) => (
          <li key={index} className="text-gray-200">
            {app.name}{" "}
            <span className="text-green-300">(API Key: {app.apiKey})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppList;
