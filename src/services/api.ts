import axios, { AxiosInstance } from 'axios';

const SERVER_URL = 'http://localhost:3001/';
const TIMEOUT = 5000;

export const api: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: TIMEOUT,
});
