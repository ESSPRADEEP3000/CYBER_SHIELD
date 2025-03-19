import { getUserIP } from "../utils/ipUtils";
import { validateIP } from "../api/firewallApi";

export const checkIP = async () => {
  try {
    const ip = await getUserIP();
    if (!ip) {
      throw new Error("Unable to fetch IP address.");
    }

    const result = await validateIP(ip);

    if (!result || typeof result.blocked !== "boolean") {
      throw new Error("Invalid response from firewall service");
    }

    return result.blocked;
  } catch (error) {
    console.error("Error checking IP:", error);
    throw new Error(`IP validation failed: ${error.message}`);
  }
};