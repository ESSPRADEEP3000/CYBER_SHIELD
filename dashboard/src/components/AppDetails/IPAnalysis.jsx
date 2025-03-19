import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Cell,
} from "recharts";

const IPAnalysis = ({ ip }) => {


    const [geoData, setGeoData] = useState(null);
    const [riskData, setRiskData] = useState(null);
    const [shapExplanation, setShapExplanation] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (ip) {

            analyzeIP(ip); // Automatically analyze the new IP
        }
    }, [ip]);

    const analyzeIP = async (ipAddress) => {
        setLoading(true);
        setError("");
        setGeoData(null);
        setRiskData(null);
        setShapExplanation([]);

        if (!ipAddress.trim()) {
            setError("Please enter a valid IP address.");
            setLoading(false);
            return;
        }

        try {
            const riskResponse = await axios.post("http://localhost:4000/api/ip/analyze", { ip: ipAddress });
            if (riskResponse.data && riskResponse.data.data) {
                setRiskData(riskResponse.data.data);
                setShapExplanation(riskResponse.data.shapExplanation || []); // Ensure it's an array
            } else {
                setError("No risk analysis data received from the server.");
            }

            const geoResponse = await axios.get(`https://ipwho.is/${ipAddress}`);
            if (geoResponse.data && geoResponse.data.success) {
                setGeoData(geoResponse.data);
            } else {
                setError(geoResponse.data.message || "Failed to fetch geolocation data.");
            }

        } catch (err) {
            setError("Failed to fetch data. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        try {
            const csvRows = [];

            // Geolocation Data Section
            if (geoData) {
                csvRows.push("Geolocation Data");
                csvRows.push("Field,Value");
                Object.keys(geoData).forEach((key) => {
                    const value = geoData[key];
                    if (
                        value !== null &&
                        value !== undefined &&
                        !(typeof value === "string" && value.trim() === "")
                    ) {
                        csvRows.push(
                            `${key},${typeof value === "object" ? JSON.stringify(value) : value}`
                        );
                    }
                });
                csvRows.push(""); // Empty line between sections
            }

            // Risk Analysis Data Section
            if (riskData) {
                csvRows.push("Risk Analysis Data");
                csvRows.push("Field,Value");
                Object.keys(riskData).forEach((key) => {
                    const value = riskData[key];
                    if (
                        value !== null &&
                        value !== undefined &&
                        !(typeof value === "string" && value.trim() === "")
                    ) {
                        csvRows.push(
                            `${key},${typeof value === "object" ? JSON.stringify(value) : value}`
                        );
                    }
                });
            }

            const csvString = csvRows.join("\n");
            const blob = new Blob([csvString], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "ipdata.csv");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            setError("Failed to export data. Please try again.");
            console.error(err);
        }
    };

    const getFeatureDescription = (feature) => {
        const geoDescriptions = {
            ip: "Queried IP address",
            success: "Query success status",
            type: "Type of IP (IPv4/IPv6)",
            continent: "Continent",
            continent_code: "Continent code",
            country: "Country",
            country_code: "Country code",
            region: "Region",
            region_code: "Region code",
            regionName: "Region name",
            city: "City",
            latitude: "Latitude",
            longitude: "Longitude",
            is_eu: "EU Member",
            postal: "Postal code",
            calling_code: "Calling code",
            capital: "Capital",
            flag: "Flag details",
            connection: "Connection details",
            timezone: "Timezone details",
        };

        const riskDescriptions = {
            ipAddress: "IP Address",
            abuseConfidenceScore: "Abuse Confidence Score",
            riskScore: "Risk Score",
            riskLevel: "Risk Level",
            countryCode: "Country Code",
            region: "Region",
            city: "City",
            usageType: "Usage Type",
            domain: "Domain",
            isp: "ISP",
            totalReports: "Total Reports",
            numDistinctUsers: "Distinct Users",
            lastReportedAt: "Last Reported",
            isWhitelisted: "Whitelisted",
            isTor: "TOR Node",
        };

        return geoDescriptions[feature] || riskDescriptions[feature] || feature;
    };

    const renderValue = (value) => {
        if (typeof value === "object" && value !== null) {
            return JSON.stringify(value);
        }
        return value;
    };

    const formatComplexField = (key, value) => {
        if (typeof value !== "object" || value === null) {
            return value;
        }
        if (key === "flag") {
            return (
                <div>
                    {value.img && (
                        <div>
                            <strong>Flag Image URL:</strong>{" "}
                            <a href={value.img} target="_blank" rel="noopener noreferrer">
                                {value.img}
                            </a>
                        </div>
                    )}
                    {value.emoji && (
                        <div>
                            <strong>Emoji:</strong> {value.emoji}
                        </div>
                    )}
                </div>
            );
        } else if (key === "connection") {
            return (
                <div>
                    {value.asn && <div><strong>ASN:</strong> {value.asn}</div>}
                    {value.org && <div><strong>Organization:</strong> {value.org}</div>}
                    {value.isp && <div><strong>ISP:</strong> {value.isp}</div>}
                </div>
            );
        } else if (key === "timezone") {
            return (
                <div>
                    {value.id && <div><strong>Timezone ID:</strong> {value.id}</div>}
                    {value.abbr && <div><strong>Abbreviation:</strong> {value.abbr}</div>}
                </div>
            );
        }
        return value;
    };


    const handleAnalyzeClick = () => {
        analyzeIP(inputIP);
    };

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-[radial-gradient(circle,_#000000_20%,_#003300_80%)] text-[#00ff00]">
            <header className="text-center py-10 shadow-md my-5">
                <h1 className="animate-glitch text-4xl font-bold">IP Geolocation &amp; Risk Analysis</h1>
            </header>

            <main className="flex flex-col items-center p-6">
                <section className="bg-[#001100] text-[#00ff00] rounded-lg shadow-lg w-11/12 my-8 p-8">
                    {ip ? (
                        <>
                            <h2 className="animate-glitch text-center text-2xl mb-6">Analyzing IP: {ip}</h2>
                            {/* Display loading or error messages */}
                            {loading && <p className="text-green-200 text-center">Loading...</p>}
                            {error && <p className="text-red-500 text-center">{error}</p>}
                            {/* Render results here */}
                            {geoData && <div>{/* Render geolocation data */}</div>}
                            {riskData && <div>{/* Render risk analysis data */}</div>}
                        </>
                    ) : (
                        <p className="text-red-500 text-center">No IP is selected. Click "Analyze IP" button in the Blocked IPs to analyze the IP.</p>
                    )}
                </section>

                {/* Results Section */}
                {(geoData || riskData) && (
                    <section className="w-11/12 my-8">
                        {/* Geolocation Data */}
                        {geoData && (
                            <div className="bg-[#001100] text-[#00ff00] rounded-lg shadow-lg p-8 mb-8">
                                <h2 className="animate-glitch text-center text-3xl mb-6">
                                    Geolocation Data
                                </h2>
                                <div className="flex flex-col md:flex-row justify-between gap-8">
                                    {/* Geolocation Table */}
                                    <div className="w-full md:w-1/2 overflow-x-auto">
                                        <table className="min-w-full divide-y divide-green-500">
                                            <thead className="bg-green-800">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-sm font-medium uppercase">
                                                        Parameter
                                                    </th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium uppercase">
                                                        Value
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-[#001100] divide-y divide-green-500">
                                                {Object.keys(geoData).map((key, index) => {
                                                    const value = geoData[key];
                                                    if (
                                                        value === null ||
                                                        value === undefined ||
                                                        (typeof value === "string" && value.trim() === "")
                                                    ) {
                                                        return null;
                                                    }
                                                    return (
                                                        <tr key={index} className="hover:bg-[#003300]">
                                                            <td className="px-4 py-2">
                                                                {getFeatureDescription(key)}
                                                            </td>
                                                            <td className="px-4 py-2">
                                                                {(key === "flag" ||
                                                                    key === "connection" ||
                                                                    key === "timezone")
                                                                    ? formatComplexField(key, value)
                                                                    : renderValue(value)}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Geolocation Map */}
                                    <div className="w-full h-80 md:w-1/3">
                                        {geoData.latitude && geoData.longitude && (
                                            <div>
                                                <h3 className="animate-glitch text-2xl mb-4">
                                                    Location Map
                                                </h3>
                                                <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg ">
                                                    <MapContainer
                                                        center={[geoData.latitude, geoData.longitude]}
                                                        zoom={16}
                                                        scrollWheelZoom={false}
                                                        className="h-full w-full"
                                                    >
                                                        <TileLayer
                                                            attribution={`${geoData.city}, ${geoData.region}, ${geoData.country}`}
                                                            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                                                        />
                                                        <Marker
                                                            position={[geoData.latitude, geoData.longitude]}
                                                        >
                                                            <Popup>
                                                                {geoData.city ? geoData.city + ", " : ""}
                                                                {geoData.region ? geoData.region + ", " : ""}
                                                                {geoData.country}
                                                            </Popup>
                                                        </Marker>
                                                        <Circle
                                                            center={[geoData.latitude, geoData.longitude]}
                                                            radius={10}
                                                            pathOptions={{
                                                                color: "#00ff00",
                                                                fillColor: "#00ff00",
                                                                fillOpacity: 0.2,
                                                            }}
                                                        />
                                                    </MapContainer>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Risk Analysis Data */}
                        {riskData && (
                            <div className="bg-[#001100] text-[#00ff00] rounded-lg shadow-lg p-8">
                                <h2 className="animate-glitch text-center text-3xl mb-6">
                                    Risk Analysis Results
                                </h2>
                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Risk Analysis Table */}
                                    <div className="w-full md:w-1/2 overflow-x-auto">
                                        <table className="min-w-full divide-y divide-green-500">
                                            <thead className="bg-green-800">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-sm font-medium uppercase">
                                                        Parameter
                                                    </th>
                                                    <th className="px-4 py-2 text-left text-sm font-medium uppercase">
                                                        Value
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-[#001100] divide-y divide-green-500">
                                                <tr className="hover:bg-[#003300]">
                                                    <td className="px-4 py-2">IP Address</td>
                                                    <td className="px-4 py-2">
                                                        {riskData.ipAddress || "N/A"}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-[#003300]">
                                                    <td className="px-4 py-2">Abuse Confidence Score</td>
                                                    <td className="px-4 py-2">
                                                        {riskData.abuseConfidenceScore ?? "N/A"}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-[#003300]">
                                                    <td className="px-4 py-2">Risk Score</td>
                                                    <td className="px-4 py-2">
                                                        {riskData.riskScore ?? "N/A"}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-[#003300]">
                                                    <td className="px-4 py-2">Risk Level</td>
                                                    <td className="px-4 py-2">
                                                        {riskData.riskLevel ?? "N/A"}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-[#003300]">
                                                    <td className="px-4 py-2">Country</td>
                                                    <td className="px-4 py-2">
                                                        {riskData.countryCode || "N/A"}
                                                    </td>
                                                </tr>
                                                {riskData.region && (
                                                    <tr className="hover:bg-[#003300]">
                                                        <td className="px-4 py-2">Region</td>
                                                        <td className="px-4 py-2">{riskData.region}</td>
                                                    </tr>
                                                )}
                                                {riskData.city && (
                                                    <tr className="hover:bg-[#003300]">
                                                        <td className="px-4 py-2">City</td>
                                                        <td className="px-4 py-2">{riskData.city}</td>
                                                    </tr>
                                                )}
                                                {riskData.latitude && riskData.longitude && (
                                                    <>
                                                        <tr className="hover:bg-[#003300]">
                                                            <td className="px-4 py-2">Latitude</td>
                                                            <td className="px-4 py-2">{riskData.latitude}</td>
                                                        </tr>
                                                        <tr className="hover:bg-[#003300]">
                                                            <td className="px-4 py-2">Longitude</td>
                                                            <td className="px-4 py-2">{riskData.longitude}</td>
                                                        </tr>
                                                    </>
                                                )}
                                                <tr className="hover:bg-[#003300]">
                                                    <td className="px-4 py-2">ISP</td>
                                                    <td className="px-4 py-2">{riskData.isp || "N/A"}</td>
                                                </tr>
                                                <tr className="hover:bg-[#003300]">
                                                    <td className="px-4 py-2">Domain</td>
                                                    <td className="px-4 py-2">
                                                        {riskData.domain || "N/A"}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-[#003300]">
                                                    <td className="px-4 py-2">Distinct Users</td>
                                                    <td className="px-4 py-2">
                                                        {riskData.numDistinctUsers || "N/A"}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-[#003300]">
                                                    <td className="px-4 py-2">Total Reports</td>
                                                    <td className="px-4 py-2">
                                                        {riskData.totalReports || 0}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-[#003300]">
                                                    <td className="px-4 py-2">Usage Type</td>
                                                    <td className="px-4 py-2">
                                                        {riskData.usageType || "N/A"}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-[#003300]">
                                                    <td className="px-4 py-2">Last Reported</td>
                                                    <td className="px-4 py-2">
                                                        {riskData.lastReportedAt
                                                            ? new Date(
                                                                riskData.lastReportedAt
                                                            ).toLocaleString()
                                                            : "N/A"}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-[#003300]">
                                                    <td className="px-4 py-2">Whitelisted</td>
                                                    <td className="px-4 py-2">
                                                        {riskData.isWhitelisted ? "Yes" : "No"}
                                                    </td>
                                                </tr>
                                                <tr className="hover:bg-[#003300]">
                                                    <td className="px-4 py-2">TOR Node</td>
                                                    <td className="px-4 py-2">
                                                        {riskData.isTor ? "Yes" : "No"}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* SHAP Visualization */}
                                    {riskData.shapExplanation &&
                                        riskData.shapExplanation.length > 0 && (
                                            <div className="w-full md:w-1/2 flex flex-col items-center">
                                                <h3 className="animate-glitch text-center text-xl mb-4">
                                                    SHAP Value Visualization
                                                </h3>
                                                <BarChart
                                                    width={500}
                                                    height={300}
                                                    data={riskData.shapExplanation}
                                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                                >
                                                    <XAxis dataKey="feature" stroke="#00ff00" />
                                                    <YAxis stroke="#00ff00" />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="contribution">
                                                        {riskData.shapExplanation.map((entry, index) => (
                                                            <Cell
                                                                key={`cell-${index}`}
                                                                fill={entry.contribution > 0 ? "red" : "green"}
                                                            />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                                <PieChart width={400} height={400}>
                                                    <Pie
                                                        data={riskData.shapExplanation}
                                                        dataKey="contribution"
                                                        nameKey="feature"
                                                        cx="50%"
                                                        cy="50%"
                                                        outerRadius={100}
                                                        label
                                                    >
                                                        {riskData.shapExplanation.map((entry, index) => (
                                                            <Cell
                                                                key={`cell-${index}`}
                                                                fill={entry.contribution > 0 ? "red" : "green"}
                                                            />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                </PieChart>
                                            </div>
                                        )}

                                </div>

                                {/* Risk Analysis Map */}
                                {riskData.latitude && riskData.longitude && (
                                    <div className="w-full mt-8">
                                        <h3 className="animate-glitch text-center text-2xl mb-4">
                                            Location Map
                                        </h3>
                                        <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg border-4 border-green-500">
                                            <MapContainer
                                                center={[riskData.latitude, riskData.longitude]}
                                                zoom={13}
                                                scrollWheelZoom={false}
                                                className="h-full w-full"
                                            >
                                                <TileLayer
                                                    attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                                />
                                                <Marker
                                                    position={[riskData.latitude, riskData.longitude]}
                                                >
                                                    <Popup>
                                                        {riskData.city ? riskData.city + ", " : ""}
                                                        {riskData.region ? riskData.region + ", " : ""}
                                                        {riskData.countryCode}
                                                        <br />
                                                        {riskData.isp}
                                                    </Popup>
                                                </Marker>
                                                <Circle
                                                    center={[riskData.latitude, riskData.longitude]}
                                                    radius={500}
                                                    pathOptions={{
                                                        color: "#00ff00",
                                                        fillColor: "#00ff00",
                                                        fillOpacity: 0.2,
                                                    }}
                                                />
                                            </MapContainer>
                                        </div>
                                    </div>
                                )}

                                {/* SHAP Explanation Table */}
                                {riskData.shapExplanation &&
                                    riskData.shapExplanation.length > 0 && (
                                        <div className="mt-8 overflow-x-auto">
                                            <h3 className="animate-glitch text-center text-2xl mb-4">
                                                SHAP Feature explanations
                                            </h3>
                                            <table className="min-w-full divide-y divide-green-500">
                                                <thead className="bg-green-800">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left text-sm font-medium uppercase">
                                                            Feature
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-sm font-medium uppercase">
                                                            Value
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-sm font-medium uppercase">
                                                            Contribution
                                                        </th>
                                                        <th className="px-4 py-2 text-left text-sm font-medium uppercase">
                                                            Explanation
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-[#001100] divide-y divide-green-500">
                                                    {riskData.shapExplanation.map((item, index) => (
                                                        <tr key={index} className="hover:bg-[#003300]">
                                                            <td className="px-4 py-2">
                                                                {getFeatureDescription(item.feature)}
                                                            </td>
                                                            <td className="px-4 py-2">{item.value}</td>
                                                            <td className="px-4 py-2">
                                                                {item.contribution.toFixed(4)}
                                                            </td>
                                                            <td className="px-4 py-2">
                                                                {item.explanation}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                            </div>
                        )}
                    </section>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-black fixed bottom-0 left-0 right-0 text-center py-4">
                <p className="text-[#00ff00] text-xs">
                    &copy; {new Date().getFullYear()} IP Geolocation &amp; Risk Analysis
                    Dashboard. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default IPAnalysis;


