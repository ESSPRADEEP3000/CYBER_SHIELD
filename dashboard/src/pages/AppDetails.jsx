import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlockedIPs } from "../services/apiService"; // Import necessary functions
import BlockedIPs from "../components/AppDetails/BlockedIPs";
import TrafficLogs from "../components/AppDetails/TrafficLogs";
import IPAnalysis from "../components/AppDetails/IPAnalysis"; // Import IPAnalysis component

const AppDetails = () => {
    const { appId } = useParams(); // Get appId from URL parameters
    const [blockedIPs, setBlockedIPs] = useState([]);
    const [token] = useState(localStorage.getItem("token"));
    const [error, setError] = useState("");
    const [selectedIP, setSelectedIP] = useState(null); // State to hold the selected IP for analysis
    const ipAnalysisRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlockedIPs = async () => {
            try {
                const data = await getBlockedIPs(appId, token); // Fetch blocked IPs
                setBlockedIPs(data);
            } catch (err) {
                setError("Failed to fetch blocked IPs.");
                console.error(err);
            }
        };

        fetchBlockedIPs();
    }, [appId, token]); // Only run when appId or token changes

    const handleAnalyzeIP = (ip) => {
        setSelectedIP(ip); // Set the selected IP for analysis
        if (ipAnalysisRef.current) {
            ipAnalysisRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the IP analysis section
        }
    };

    const handleBack = () => {
        navigate("/dashboard");
    };

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <div className="min-h-screen my-6 bg-gray-900 p-8">
            <h1 className="text-3xl font-bold text-center text-green-400 mb-8">
                Details for App ID: {appId}
            </h1>
            <button onClick={handleBack} className="text-green-300 hover:text-green-400 mb-4">
                &larr; Back to Dashboard
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold text-green-300 mb-4">Blocked IPs</h2>
                    <BlockedIPs appId={appId} token={token} onAnalyzeIP={handleAnalyzeIP} />
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-semibold text-green-300 mb-4">Traffic Logs</h2>
                    <TrafficLogs appId={appId} /> {/* TrafficLogs component handles fetching */}
                </div>
            </div>

            {/* Render IPAnalysis component if an IP is selected */}
            <div ref={ipAnalysisRef} className="bg-gray-800 p-6 rounded-lg shadow-xl mt-6">
                <h2 className="text-2xl font-semibold text-green-300 mb-4">IP Analysis</h2>
                <IPAnalysis ip={selectedIP} /> {/* Pass the selected IP to IPAnalysis */}
            </div>
        </div>
    );
};

export default AppDetails;