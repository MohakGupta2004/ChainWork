import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:3000/api/v1', // Set your base URL here
  baseURL: 'https://work3-y5ld.onrender.com'
});

export default api; 