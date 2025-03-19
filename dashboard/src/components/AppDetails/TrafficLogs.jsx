// // dashboard/src/components/AppDetails/TrafficLogs.jsx
// import React, { useEffect, useState } from "react";
// import { connectWebSocket, disconnectWebSocket, fetchTrafficLogs } from "../../api/firewallApi";

// const TrafficLogs = ({ appId }) => {
//   const [logs, setLogs] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [socketConnected, setSocketConnected] = useState(false);
//   const logsPerPage = 10;

//   useEffect(() => {
//     if (!appId) return;

//     const handleTrafficUpdate = (newLog) => {
//       console.log("🚀 Received traffic update:", newLog);

//       if (!newLog) {
//         console.warn("⚠️ Received empty traffic update");
//         return;
//       }

//       // If missing URL, try to extract it from request
//       if (!newLog.url && newLog.request) {
//         newLog.url = newLog.request.url || newLog.request;
//       }

//       // Add timestamp if missing
//       if (!newLog.timestamp) {
//         newLog.timestamp = new Date().toISOString();
//       }

//       setLogs((prevLogs) => {
//         // Prevent duplicate logs
//         const isDuplicate = prevLogs.some(log =>
//           log.timestamp === newLog.timestamp && log.url === newLog.url
//         );

//         if (isDuplicate) return prevLogs;

//         console.log("✅ Adding new log to state:", newLog);
//         return [newLog, ...prevLogs]; // Prepend new log
//       });
//     };

//     const initializeTrafficMonitoring = async () => {
//       try {
//         console.log(`🔄 Initializing traffic monitoring for app: ${appId}`);
//         await connectWebSocket(appId, handleTrafficUpdate);
//         setSocketConnected(true);
//         await fetchLogs(1);
//       } catch (error) {
//         console.error("❌ Failed to initialize traffic monitoring:", error);
//         setError("Failed to connect to traffic monitoring");
//         setSocketConnected(false);
//       }
//     };

//     initializeTrafficMonitoring();

//     return () => {
//       console.log(`🔌 Disconnecting WebSocket for app: ${appId}`);
//       disconnectWebSocket(appId);
//       setSocketConnected(false);
//     };
//   }, [appId]);


//   const fetchLogs = async (pageNum) => {
//     if (!appId) return;
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetchTrafficLogs(appId, pageNum, logsPerPage);
//       if (response && response.logs?.length > 0) {
//         setLogs(response.logs);  // Append logs instead of replacing
//         setTotalPages(response.totalPages || 1);
//         setPage(pageNum);
//       } else if (pageNum === 1) {
//         setLogs([]);
//         setError("No logs found.");
//       }
//     } catch (err) {
//       console.error("❌ Error fetching logs:", err);
//       setError("Error fetching logs. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
//       {loading && <p className="text-green-200">Loading logs...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {socketConnected ? (
//         <p className="text-green-400 mb-2">✅ Real-time monitoring active</p>
//       ) : (
//         <p className="text-yellow-400 mb-2">⚠️ Real-time monitoring inactive</p>
//       )}
//       {/* Scrollable Log List */}
//       <div className="max-h-96 overflow-y-auto border border-green-500 rounded-lg p-2">
//         {logs.length > 0 ? (
//           <ul className="divide-y divide-green-700">
//             {logs.map((log, index) => (
//               <li key={index} className="py-4 text-green-200">
//                 <div><strong>IP:</strong> {log.ip}</div>
//                 <div><strong>Full URL:</strong> {log.url}</div>
//                 <div><strong>Method:</strong> {log.method}</div>
//                 <div><strong>Status:</strong> {log.statusCode}</div>
//                 <div><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-green-200">No traffic data available yet.</p>
//         )}
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-between mt-4">
//         <button
//           className="px-4 py-2 bg-gray-700 text-green-200 rounded disabled:opacity-50"
//           onClick={() => fetchLogs(page - 1)}
//           disabled={page <= 1 || loading}
//         >
//           Previous
//         </button>
//         <span className="text-green-200">Page {page} of {totalPages}</span>
//         <button
//           className="px-4 py-2 bg-gray-700 text-green-200 rounded disabled:opacity-50"
//           onClick={() => fetchLogs(page + 1)}
//           disabled={page >= totalPages || loading}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TrafficLogs;

// dashboard/src/components/AppDetails/TrafficLogs.jsx
import React, { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket, fetchTrafficLogs } from "../../api/firewallApi";

const TrafficLogs = ({ appId }) => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [selectedLogIndex, setSelectedLogIndex] = useState(null); // Index of the log to show in modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const logsPerPage = 9;

  useEffect(() => {
    if (!appId) return;

    const handleTrafficUpdate = (newLog) => {
      console.log("🚀 Received traffic update:", newLog);

      if (!newLog) {
        console.warn("⚠️ Received empty traffic update");
        return;
      }

      // If missing URL, try to extract it from request
      if (!newLog.url && newLog.request) {
        newLog.url = newLog.request.url || newLog.request;
      }

      // Add timestamp if missing
      if (!newLog.timestamp) {
        newLog.timestamp = new Date().toISOString();
      }

      setLogs((prevLogs) => {
        // Prevent duplicate logs
        const isDuplicate = prevLogs.some(
          (log) => log.timestamp === newLog.timestamp && log.url === newLog.url
        );
        if (isDuplicate) return prevLogs;

        console.log("✅ Adding new log to state:", newLog);
        return [newLog, ...prevLogs]; // Prepend new log
      });
    };

    const initializeTrafficMonitoring = async () => {
      try {
        console.log(`🔄 Initializing traffic monitoring for app: ${appId}`);
        await connectWebSocket(appId, handleTrafficUpdate);
        setSocketConnected(true);
        await fetchLogs(1);
      } catch (error) {
        console.error("❌ Failed to initialize traffic monitoring:", error);
        setError("Failed to connect to traffic monitoring");
        setSocketConnected(false);
      }
    };

    initializeTrafficMonitoring();

    return () => {
      console.log(`🔌 Disconnecting WebSocket for app: ${appId}`);
      disconnectWebSocket(appId);
      setSocketConnected(false);
    };
  }, [appId]);

  const fetchLogs = async (pageNum) => {
    if (!appId) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetchTrafficLogs(appId, pageNum, logsPerPage);
      if (response && response.logs?.length > 0) {
        setLogs(response.logs);
        setTotalPages(response.totalPages || 1);
        setPage(pageNum);
      } else if (pageNum === 1) {
        setLogs([]);
        setError("No logs found.");
      }
    } catch (err) {
      console.error("❌ Error fetching logs:", err);
      setError("Error fetching logs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Open the modal with the selected log index
  const openModal = (index) => {
    setSelectedLogIndex(index);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Navigate to the previous log in the modal
  const prevLog = () => {
    if (selectedLogIndex > 0) {
      setSelectedLogIndex(selectedLogIndex - 1);
    }
  };

  // Navigate to the next log in the modal
  const nextLog = () => {
    if (selectedLogIndex < logs.length - 1) {
      setSelectedLogIndex(selectedLogIndex + 1);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
      {loading && <p className="text-green-200">Loading logs...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {socketConnected ? (
        <p className="text-green-400 mb-2">✅ Real-time monitoring active</p>
      ) : (
        <p className="text-yellow-400 mb-2">⚠️ Real-time monitoring inactive</p>
      )}

      {/* Scrollable Summary Log List */}
      {/* <div className="max-h-96 overflow-y-auto text-center border border-green-500 rounded-lg p-2">
        {logs.length > 0 ? (
          <ul className="divide-y divide-green-700">
            {logs.map((log, index) => (
              <li
                key={index}
                className="py-2 text-green-200 cursor-pointer hover:bg-gray-700"
                onClick={() => openModal(index)}
              >
                <div>
                  <strong className="text-left">IP:</strong> {log.ip}
              
                  <strong className="text-right">Time:</strong> {new Date(log.timestamp).toLocaleTimeString()}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-200">No traffic data available yet.</p>
        )}
      </div> */}

      <div className="max-h-96 overflow-y-auto text-center border border-green-500 rounded-lg p-2">
        {logs.length > 0 ? (
          <ul className="divide-y divide-green-700">
            {logs.map((log, index) => (
              <li
                key={index}
                className="py-2 text-green-200 cursor-pointer hover:bg-gray-700"
                onClick={() => openModal(index)}
              >
                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <strong>Time:</strong> {new Date(log.timestamp).toLocaleTimeString()}
                  </div>
                  <div className="text-right">
                    <strong>IP:</strong> {log.ip}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-200">No traffic data available yet.</p>
        )}
      </div>


      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-700 text-green-200 rounded disabled:opacity-50"
          onClick={() => fetchLogs(page - 1)}
          disabled={page <= 1 || loading}
        >
          Previous
        </button>
        <span className="text-green-200">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-700 text-green-200 rounded disabled:opacity-50"
          onClick={() => fetchLogs(page + 1)}
          disabled={page >= totalPages || loading}
        >
          Next
        </button>
      </div>

      {/* Modal for Detailed Log View */}
      {isModalOpen && selectedLogIndex !== null && logs[selectedLogIndex] && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-11/12 md:w-1/2 relative">
            <button
              onClick={closeModal}
              className="text-green-300 absolute top-2 right-2 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-green-300 mb-4">Log Details</h2>
            <div className="text-green-200">
              <p>
                <strong>IP:</strong> {logs[selectedLogIndex].ip}
              </p>
              <p>
                <strong>Full URL:</strong> {logs[selectedLogIndex].url}
              </p>
              <p>
                <strong>Method:</strong> {logs[selectedLogIndex].method}
              </p>
              <p>
                <strong>Status:</strong> {logs[selectedLogIndex].statusCode}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(logs[selectedLogIndex].timestamp).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={prevLog}
                disabled={selectedLogIndex <= 0}
                className="px-4 py-2 bg-gray-700 text-green-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={nextLog}
                disabled={selectedLogIndex >= logs.length - 1}
                className="px-4 py-2 bg-gray-700 text-green-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrafficLogs;
