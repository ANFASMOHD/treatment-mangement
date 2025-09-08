const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-backend.onrender.com" // 🔹 Production backend
    : "http://localhost:4000";            // 🔹 Local backend

export default API_BASE_URL;
