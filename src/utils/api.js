import axios from 'axios';
import { getApiUrl } from '../config/api.config';
import { showErrorToast } from '../utils/toasts';

export async function apiRequest(endpoint, { method = 'GET', body, headers = {}, ...rest } = {}) {
  const token = sessionStorage.getItem('accessToken');
  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };
  if (token) {
    finalHeaders['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(getApiUrl(endpoint), {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });
  if (response.status === 401) {
    // Token invalid/expired, force logout
    sessionStorage.removeItem('accessToken');
    window.location.href = '/';
    return;
  }
  return response;
}

export async function apiRequestAxios({ endpoint, method = 'GET', data = {}, headers = {}, ...rest }) {
  const token = sessionStorage.getItem('accessToken');
  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };
  if (token) {
    finalHeaders['Authorization'] = `Bearer ${token}`;
  }
  try {
    const response = await axios({
      url: getApiUrl(endpoint),
      method,
      data,
      headers: finalHeaders,
      ...rest,
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem('accessToken');
      showErrorToast("Session expired! please login agian!");
      window.location.href = '/';
    }
    console.error(error);
    throw error;
  }
} 
