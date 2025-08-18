import axios from 'axios';

const API_URL = "http://localhost:9000/api/users";

export const loginUser = (data) => {
  return axios.post(`${API_URL}/login`, data);
};

export const registerUser = (data) => {
  return axios.post(`${API_URL}/register`, data);
};

export const resetPassword = (data) => {
  return axios.post(`${API_URL}/forget-password`, data);
};
