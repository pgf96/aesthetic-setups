import { getToken } from "./users-service";

const BASE_URL = 'api/users'

export async function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`)
}

// helper functions

async function sendRequest(url, method= 'GET', payload = null) {
    const options = { method }
    if (payload) {
        options.headers = {'Content-Type': 'application/json'}
        options.body = JSON.stringify(payload)
    }
    const token = getToken()
    if (token) {
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(url, options); 
    // res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) return res.json();
    throw new Error('Bad Request');
}



// export async function login(credentials) {
//     const res = await fetch(`${BASE_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json'},
//         body: JSON.stringify(credentials)
//     })
//     if (res.ok) {
//         return res.json()
//     } else {
//         throw new Error('Invalid Sign Up')
//     }
// }
