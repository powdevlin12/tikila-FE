import axios from 'axios';

// Tạo axios instance với config mặc định
const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor - thêm token nếu có
apiClient.interceptors.request.use(
	config => {
		// Check if we're in the browser
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('token');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

// Response interceptor - xử lý lỗi chung
apiClient.interceptors.response.use(
	response => {
		return response.data;
	},
	error => {
		if (error.response?.status === 401) {
			// Token hết hạn, redirect về login
			if (typeof window !== 'undefined') {
				localStorage.removeItem('token');
				window.location.href = '/login';
			}
		}
		return Promise.reject(error);
	},
);

export default apiClient;
