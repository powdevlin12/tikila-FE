import apiClient from './api';
import type {
	StarCustomer,
	StarCustomerResponse,
} from '../interfaces/StarCustomer';

export const StarCustomerService = {
	// Lấy tất cả đánh giá khách hàng
	getStarCustomers: async (): Promise<StarCustomer[]> => {
		const response = await apiClient.get<StarCustomerResponse>(
			'/star-customers',
		);
		return response.data.data;
	},

	// Lấy đánh giá khách hàng theo ID
	getStarCustomerById: async (id: number): Promise<StarCustomer> => {
		const response = await apiClient.get<{ data: StarCustomer }>(
			`/star-customers/${id}`,
		);
		return response.data.data;
	},

	// Lấy thống kê đánh giá khách hàng
	getStarCustomerStats: async () => {
		const response = await apiClient.get('/star-customers/stats/summary');
		return response.data;
	},
};
