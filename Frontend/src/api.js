const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "https://internship-placement-tracker-backen.vercel.app/api";

export default API_URL;