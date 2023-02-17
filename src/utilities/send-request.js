import { getToken } from "./users-service";

export default async function sendRequest(url, method = 'GET', payload = null) {
    const options = { method };
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    // Ensure headers object exists
    options.headers = options.headers || {};
    // Add token to an Authorization header
    options.headers.Authorization = `Bearer ${token}`;
  }
  try {
    const res = await fetch(url, options);
    // res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) return res.json();
    throw new Error('bad request')
    // const error = new Error('Bad Request')
  } catch (error) {
    console.error('error in API request', error)
    throw error

  }
}