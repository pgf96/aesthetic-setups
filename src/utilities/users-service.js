import * as usersAPI from './users-api'

export async function signUp(userData) {
    //network request code to the users-api.js API module
    const token = await usersAPI.signUp(userData);
    localStorage.setItem('token', token);
    return getUser();
  }

  export async function login(credentials) {
    const token = await usersAPI.login(credentials)
    localStorage.setItem('token', token);
    return getUser()
  }

  export function getToken() {
    // getItem method will return null if there's no key
    const token = localStorage.getItem('token');
    if (!token) return null;
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    if (payload.exp < Date.now() / 1000) {
      // Token has expired
      localStorage.removeItem('token');
      return null;
    }
    return token;
  }

  export function getUser() {
    const token = getToken();
    const user = token ? JSON.parse(window.atob(token.split('.')[1])).user : null;
    // console.log(user.roles)
    // return token ? JSON.parse(window.atob(token.split('.')[1])).user : null;
    return user
  }

  export function logOut() {
    localStorage.removeItem('token')
  }

  export function checkToken() {
    return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr))
  }

  export function getRoles() {
    return getUser().roles
    
  }