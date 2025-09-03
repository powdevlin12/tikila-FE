import { apiPost } from './mutations';
import type {
	ContactCustomerData,
	ContactCustomerResponse,
} from '../interfaces/ContactCustomer';

export const contactCustomerService = {
	// Gửi thông tin liên hệ của khách hàng
	saveCustomerContact: async (
		data: ContactCustomerData,
	): Promise<ContactCustomerResponse> => {
		return apiPost<ContactCustomerResponse>('/contact-customer', data);
	},
};
