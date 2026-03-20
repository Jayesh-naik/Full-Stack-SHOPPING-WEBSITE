const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000').replace(/\/$/, '');

const createHeaders = (token) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  return headers;
};

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
};

const request = async (path, { method = 'GET', body, token } = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: createHeaders(token),
    body: body ? JSON.stringify(body) : undefined,
  });

  return parseResponse(response);
};

export const loginRequest = async ({ email, password }) =>
  request('/api/auth/login', { method: 'POST', body: { email, password } });

export const registerRequest = async ({ name, email, password }) =>
  request('/api/auth/register', { method: 'POST', body: { name, email, password } });

export const fetchProfile = async (token) =>
  request('/api/auth/me', { method: 'GET', token });
