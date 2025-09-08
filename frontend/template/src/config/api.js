const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-backend.onrender.com" 
    : "http://localhost:4000";            

export default API_BASE_URL;
