export interface Product {
	id: number;
	title: string;
	description: string;
	image_url: string;
	company_id: number | null;
	detail_info: string | null;
	created_at: Date;
}
