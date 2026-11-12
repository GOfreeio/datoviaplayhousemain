export const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export const API_URL_REQUIRED_MESSAGE =
  "API URL is not configured. Set VITE_API_URL in your frontend environment.";
