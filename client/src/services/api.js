import axios from 'axios';

// Create an Axios instance pointing to our backend
const api = axios.create({
  // If we are in development (localhost), use localhost. 
  // If in production (Vercel), use the live Render URL.
  baseURL: import.meta.env.PROD 
    ? 'https://ghunghat-sultana.onrender.com/api' // <-- YOUR LIVE RENDER URL + /api
    : 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;