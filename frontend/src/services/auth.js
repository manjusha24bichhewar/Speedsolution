const TOKEN_KEY = 'speed_solution_token';
const USER_KEY = 'speed_solution_user';

function notifyAuthChanged() {
  window.dispatchEvent(new Event('speed-solution-auth-changed'));
}

export function setAuthSession({ token, user }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  notifyAuthChanged();
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  notifyAuthChanged();
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}
