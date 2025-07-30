import axios from 'axios';

const API_BASE_URL = 'https://6889d5404c55d5c73953bebc.mockapi.io/';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});