import apiClient from './api';
import type { FooterColumn, FooterLink } from '../interfaces/Footer';

export class FooterService {
	// Lấy tất cả footer columns với footer links
	static async getAllFooterColumns(): Promise<FooterColumn[]> {
		const response = await apiClient.get<{
			isSuccess: boolean;
			message: string;
			data: FooterColumn[];
		}>('/footer-columns');
		return response.data.data;
	}

	// Lấy footer links được nhóm theo column
	static async getFooterLinksGrouped(): Promise<Record<number, FooterLink[]>> {
		const response = await apiClient.get<{
			isSuccess: boolean;
			message: string;
			data: Record<
				number,
				{
					columnId: number;
					columnTitle: string;
					columnPosition: number;
					links: FooterLink[];
				}
			>;
		}>('/footer-links/grouped');

		// Transform data để trả về theo format mong muốn
		const grouped: Record<number, FooterLink[]> = {};
		const data = response.data.data;

		Object.values(data).forEach(column => {
			grouped[column.columnId] = column.links;
		});

		return grouped;
	}

	// Lấy footer links theo column ID
	static async getFooterLinksByColumn(columnId: number): Promise<FooterLink[]> {
		const response = await apiClient.get<{
			isSuccess: boolean;
			message: string;
			data: FooterLink[];
		}>(`/footer-links/column/${columnId}`);
		return response.data.data;
	}
}
