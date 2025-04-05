
// const USERNAME = "parkjungyu";

// export async function fetchDocuments() {
//   const response = await fetch(`${BASE_URL}/documents`, {
//     method: "GET",
//     headers: {
//       "x-username": USERNAME,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Network response is not ok!");
//   }
//   return await response.json();
// }

// export async function postDocument() {
//   const response = await fetch(`${BASE_URL}/documents`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "x-username": USERNAME,
//     },
//     body: JSON.stringify({
//       title: "",
//       parent: null,
//     }),
//   });
//   if (!response.ok) {
//     throw new Error("Network response is not ok!");
//   }
//   return await response.json();
// }
