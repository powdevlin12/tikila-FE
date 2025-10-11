export interface Product {
	id?: number;
	title?: string;
	description?: string;
	imageUrl?: string;
	company_id?: number | null;
	detailInfo?: string | null;
	createdAt?: Date;
}
