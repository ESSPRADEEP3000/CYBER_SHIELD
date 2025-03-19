import React, { useState, useEffect } from "react";
import { getBlockedIPs, blockIP, unblockIP } from "../../services/apiService"; // Import necessary functions

const BlockedIPs = ({ appId, token, onAnalyzeIP }) => {
  const [blockedIPs, setBlockedIPs] = useState([]);
  const [ipToBlock, setIpToBlock] = useState("");

  useEffect(() => {
    const fetchBlockedIPs = async () => {
      try {
        const data = await getBlockedIPs(appId, token); // Fetch blocked IPs
        setBlockedIPs(data);
      } catch (err) {
        console.error("Failed to fetch blocked IPs:", err);
      }
    };

    fetchBlockedIPs();
  }, [appId, token]);

  const handleBlockIP = async () => {
    try {
      if (ipToBlock) {
        // Block IP using the API
        await blockIP(appId, ipToBlock, token);
        setBlockedIPs((prevIPs) => [...prevIPs, ipToBlock]); // Storing only the IP
        setIpToBlock(""); // Clear the input field after blocking
      }
    } catch (error) {
      console.error("Error blocking IP:", error);
    }
  };

  const handleUnblockIP = async (ip) => {
    try {
      // Unblock the selected IP
      await unblockIP(appId, ip, token);
      setBlockedIPs(
        (prevIPs) => prevIPs.filter((blockedIP) => blockedIP !== ip) // Filter based on the IP directly
      );
    } catch (error) {
      console.error("Error unblocking IP:", error);
    }
  };


  // Debug log
  return (
    <div className="text-white shadow rounded-lg p-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={ipToBlock}
          onChange={(e) => setIpToBlock(e.target.value)}
          placeholder="Enter IP to block"
          className="border rounded-lg px-4 py-2 flex-grow"
        />
        <button
          onClick={handleBlockIP}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Block IP
        </button>
      </div>
      <ul className="space-y-2">
        {blockedIPs.length > 0 ? (
          blockedIPs.map((ip, index) => (
            <li key={index} className="flex items-center justify-between bg-gray-900 p-3 rounded">
              <span className="text-gray-200">{ip}</span>
              <div className="flex gap-2">

                <button
                  onClick={() => handleUnblockIP(ip)}
                  className="text-blue-500 hover:underline"
                >
                  Unblock
                </button>
                <button
                  onClick={() => onAnalyzeIP(ip)} // Call the analyze function passed as a prop
                  className="text-blue-400 hover:text-blue-300"
                >
                  Analyze
                </button>

              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-400">No IPs blocked. Please add one!</p>
        )}
      </ul>
    </div>
  );
};

export default BlockedIPs;