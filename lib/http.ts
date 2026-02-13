import axios, { type AxiosError } from "axios";
import axiosCaseConverter from "axios-case-converter";

import { API_BASE_URL } from "@/constants/common";

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

async function handleError(error: AxiosError) {
  return Promise.reject(error);
}

export function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error);
}

export const http = axiosCaseConverter(instance);
http.interceptors.response.use(null, handleError);
