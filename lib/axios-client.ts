import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Client for unauthenticated API calls
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Client for authenticated API calls
export const authenticatedApiClient = () => {
  // Get token from local storage (only available in browser)
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('access_token') || '';
  }

  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
}; 