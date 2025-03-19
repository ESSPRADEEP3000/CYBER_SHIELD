import mongoose from "mongoose";
import App from "../models/App.js";

// Store app into the database
export const storeApp = async (appData) => {
  const app = new App(appData);
  await app.save();
  return app;
};

// Find apps by userId
export const findAppsByUserId = async (userId) => {
  return await App.find({ user: userId });
};

// Find app by appId
export const findAppById = async (appId) => {
  return await App.findById(appId);
};

// Find app by API Key
export const findAppByApiKey = async (apiKey) => {
  return await App.findOne({ apiKey });
};
