// import React, { useState } from "react";
// import { addApp } from "../../services/apiService";

// const AddApp = ({ token, onAppAdded }) => {
//   const [appName, setAppName] = useState("");

//   const handleAddApp = async () => {
//     try {
//       const app = await addApp(appName, token);
//       onAppAdded(app);
//       setAppName("");
//     } catch (error) {
//       console.error("Error adding app:", error);
//     }
//   };

//   return (
//     <div className="bg-gray-50 shadow rounded-lg p-4">
//       <h2 className="text-xl font-semibold mb-2">Add New App</h2>
//       <div className="flex items-center gap-2">
//         <input
//           type="text"
//           placeholder="App Name"
//           value={appName}
//           onChange={(e) => setAppName(e.target.value)}
//           className="border rounded-lg px-4 py-2 w-full"
//         />
//         <button
//           onClick={handleAddApp}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Add App
//         </button>
//       </div>
//     </div>

//   );
// };

// export default AddApp;


import React, { useState } from "react";
import { addApp } from "../../services/apiService";

const AddApp = ({ token, onAppAdded }) => {
  const [appName, setAppName] = useState("");

  const handleAddApp = async () => {
    try {
      const app = await addApp(appName, token);
      onAppAdded(app);
      setAppName("");
    } catch (error) {
      console.error("Error adding app:", error);
    }
  };

  return (
    <div className="bg-gray-800 shadow rounded-lg p-5">
      {/* <h2 className="text-lg font-semibold mb-3 text-green-400">Add New App</h2> */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="App Name"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          className="border border-gray-700 rounded-md px-3 py-3 w-full bg-gray-900 text-gray-200 placeholder-gray-500 text-sm"
        />
        <button
          onClick={handleAddApp}
          className="bg-green-600 text-white px-3 py-3 rounded-md hover:bg-green-700 transition duration-300 whitespace-nowrap"
        >
          <span className="hidden sm:inline">Add App</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </div>
  );
};

export default AddApp;
