export const API_URL = (import.meta.env.API_URL || "").replace(/\/+$/, "");

export const API_URL_REQUIRED_MESSAGE =
  "API URL is not configured. Set API_URL in your frontend environment.";
