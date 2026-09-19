const AUTH_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const normalizeCredentials = async ({ email, password }) => {
  const normalizedEmail = String(email || "").trim();
  const normalizedPassword = String(password || "").trim();

  if (!normalizedEmail || !normalizedPassword) {
    throw new Error("Completa email y contraseña antes de continuar.");
  }

  return {
    email: normalizedEmail,
    password: normalizedPassword,
  };
};

const checkResponse = async (res) => {
  if (res.ok) {
    return res.json();
  }

  const errorBody = await res.json().catch(() => null);
  const errorMessage = errorBody?.message || `Error: ${res.status}`;
  return Promise.reject(errorMessage);
};

export const signUp = async (credentials) => {
  const normalizedCredentials = await normalizeCredentials(credentials);

  return fetch(`${AUTH_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(normalizedCredentials),
  }).then(checkResponse);
};

export const signIn = async (credentials) => {
  const normalizedCredentials = await normalizeCredentials(credentials);

  return fetch(`${AUTH_BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(normalizedCredentials),
  }).then(checkResponse);
};

export const checkToken = (token) => {
  return fetch(`${AUTH_BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export default AUTH_BASE_URL;
