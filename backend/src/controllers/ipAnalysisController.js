import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const analyzeIP = async (req, res) => {
  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({ error: "IP address is required" });
  }

  try {
    // Fetch data from AbuseIPDB
    const abuseIPDBResponse = await axios.get(
      "https://api.abuseipdb.com/api/v2/check",
      {
        params: { ipAddress: ip, maxAgeInDays: 90 },
        headers: {
          Key: process.env.abuseIPDBApiKey,
          Accept: "application/json",
        },
      }
    );

    const abuseIPData = abuseIPDBResponse.data.data;
    const reports = abuseIPData.reports || [];

    // Prepare features for AI model
    const features = {
      abuseConfidenceScore: abuseIPData.abuseConfidenceScore,
      countryCode: abuseIPData.countryCode,
      usageType: abuseIPData.usageType,
      domain: abuseIPData.domain,
      isp: abuseIPData.isp,
      totalReports: abuseIPData.totalReports,
      numDistinctUsers: abuseIPData.numDistinctUsers || 0,
      lastReportedAt: abuseIPData.lastReportedAt
        ? new Date(abuseIPData.lastReportedAt).getTime()
        : null,
      isWhitelisted: abuseIPData.isWhitelisted,
      isTor: abuseIPData.isTor,
    };

    // Log the data being sent to the Flask API
    console.log("Sending data to Flask API:", features);

    // Fetch risk score and explanations from AI model (Flask API)
    const aiResponse = await axios.post("http://localhost:5001/api/predict", {
      features,
    });
    console.log("Response from Flask API:", aiResponse.data);

    // Retrieve the SHAP explanation array (each object contains: feature, value, contribution)
    const shapExplanation = aiResponse.data.shapSummary || [];

    // Prepare a detailed explanation for each feature
    const detailedImpact = shapExplanation.map((item) => ({
      feature: item.feature,
      value: item.value,
      contribution: item.contribution,
      explanation: `${item.feature} with a value of ${
        item.value
      } contributes ${item.contribution.toFixed(4)} to the risk score.`,
    }));

    // Assemble the complete analysis result with calculation details
    const analysisResult = {
      ...abuseIPData,
      riskScore: aiResponse.data.riskScore,
      riskLevel: aiResponse.data.riskLevel,
      baseValue: aiResponse.data.baseValue,
      calculation: aiResponse.data.calculation,
      shapExplanation: detailedImpact,
      reports: reports, // Adding reports to the analysis result
    };

    res.json({ data: analysisResult });
  } catch (error) {
    // Log more detailed error information if available
    console.error(
      "Error analyzing IP:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to analyze IP" });
  }
};

export const findRiskScore = async (ip) => {
  if (!ip) {
    throw new Error("IP address is required");
  }

  try {
    // Fetch data from AbuseIPDB
    const abuseIPDBResponse = await axios.get(
      "https://api.abuseipdb.com/api/v2/check",
      {
        params: { ipAddress: ip, maxAgeInDays: 90 },
        headers: {
          Key: process.env.abuseIPDBApiKey,
          Accept: "application/json",
        },
      }
    );

    const abuseIPData = abuseIPDBResponse.data.data;

    // Prepare features for AI model
    const features = {
      abuseConfidenceScore: abuseIPData.abuseConfidenceScore,
      countryCode: abuseIPData.countryCode,
      usageType: abuseIPData.usageType,
      domain: abuseIPData.domain,
      isp: abuseIPData.isp,
      totalReports: abuseIPData.totalReports,
      numDistinctUsers: abuseIPData.numDistinctUsers || 0,
      lastReportedAt: abuseIPData.lastReportedAt
        ? new Date(abuseIPData.lastReportedAt).getTime()
        : null,
      isWhitelisted: abuseIPData.isWhitelisted,
      isTor: abuseIPData.isTor,
    };

    // Log the data being sent to the Flask API
    console.log("Sending data to Flask API:", features);

    // Fetch risk score from AI model (Flask API)
    const aiResponse = await axios.post("http://localhost:5001/api/predict", {
      features,
    });
    console.log("Response from Flask API:", aiResponse.data);

    // Return the risk score from the AI model response
    return aiResponse.data.riskScore;
  } catch (error) {
    console.error(
      "Error finding risk score:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to find risk score");
  }
};
