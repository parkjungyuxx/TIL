// api.js
const BASE_URL = "https://kdt-api.fe.dev-cos.com";
const USERNAME = "parkjungyu";

export async function fetchDocuments() {
  const response = await fetch(`${BASE_URL}/documents`, {
    headers: {
      "x-username": USERNAME,
    },
  });
  if (!response.ok) {
    throw new Error("Network response is not ok!");
  }
  return await response.json();
}




