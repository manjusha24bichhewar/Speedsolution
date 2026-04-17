const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('speed_solution_token');

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  requestPasswordOtp: (payload) => request('/auth/forgot-password/request-otp', { method: 'POST', body: JSON.stringify(payload) }),
  resetPasswordWithOtp: (payload) => request('/auth/forgot-password/reset', { method: 'POST', body: JSON.stringify(payload) }),
  createEnquiry: (payload) => request('/enquiries', { method: 'POST', body: JSON.stringify(payload) }),
  getProfile: () => request('/auth/me'),
  getAdminSummary: () => request('/admin/summary'),
  getAdminEnquiries: (params = {}) => {
    const searchParams = new URLSearchParams(params);
    const query = searchParams.toString();
    return request(`/admin/enquiries${query ? `?${query}` : ''}`);
  },
  markEnquiryCompleted: (id) => request(`/admin/enquiries/${id}/complete`, { method: 'PATCH' })
};
