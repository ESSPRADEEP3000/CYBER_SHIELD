import { saveRule, getRuleByIP, deleteRuleByIP } from "../db/ruleStore.js";

// Block an IP
export const blockIP = async (ip) => {
  const rule = await getRuleByIP(ip);
  if (!rule) {
    await saveRule(ip, "block");
  }
};

// Unblock an IP
export const unblockIP = async (ip) => {
  const rule = await getRuleByIP(ip);
  if (rule) {
    await deleteRuleByIP(ip);
  }
};

// Check if IP is blocked
export const isBlocked = async (ip) => {
  const rule = await getRuleByIP(ip);
  return rule && rule.action === "block";
};
