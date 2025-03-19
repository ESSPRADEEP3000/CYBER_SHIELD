// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const APIKey = () => {
//   const [apiKey, setApiKey] = useState("");

//   useEffect(() => {
//     const fetchAPIKey = async () => {
//       try {
//         const response = await axios.get("/api/api-key");
//         setApiKey(response.data.apiKey);
//       } catch (error) {
//         console.error("Error fetching API key:", error);
//       }
//     };

//     fetchAPIKey();
//   }, []);

//   return (
//     <div>
//       <h2>Your API Key</h2>
//       <p>{apiKey ? apiKey : "Loading..."}</p>
//     </div>
//   );
// };

// export default APIKey;


import React, { useState, useEffect } from "react";
import axios from "axios";

const APIKey = () => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const fetchAPIKey = async () => {
      try {
        const response = await axios.get("/api/api-key");
        setApiKey(response.data.apiKey);
      } catch (error) {
        console.error("Error fetching API key:", error);
      }
    };

    fetchAPIKey();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-green-400 mb-4">Your API Key</h2>
      <p className="text-lg text-gray-200">
        {apiKey ? apiKey : "Loading..."}
      </p>
    </div>
  );
};

export default APIKey;
