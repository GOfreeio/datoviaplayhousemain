export const VITE_API_URL = (import.meta.env.VITE_API_URL || "").trim().replace(/\/+$/, "");

export const VITE_API_URL_REQUIRED_MESSAGE =
  "API URL is not configured. Set VITE_API_URL in your frontend environment.";

export async function readApiJson(response, endpoint) {
  const responseText = await response.text();

  try {
    return JSON.parse(responseText);
  } catch {
    throw new Error(
      `${endpoint} returned a non-JSON response (HTTP ${response.status}). Check that VITE_API_URL points to the backend and that this API route is implemented and deployed.`
    );
  }
}