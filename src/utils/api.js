import axios from 'axios';

export async function apiRequest(url, { method = 'GET', body, headers = {}, ...rest } = {}) {
  const token = sessionStorage.getItem('accessToken');
  const finalHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };
  if (token) {
    finalHeaders['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(url, {
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

export async function apiRequestAxios({ url, method = 'GET', data = {}, headers = {}, ...rest }) {
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
      url,
      method,
      data,
      headers: finalHeaders,
      ...rest,
    });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem('accessToken');
      window.location.href = '/';
    }
    throw error;
  }
} 