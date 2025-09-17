export interface StarCustomer {
	id: number;
	name_customer: string;
	star: number;
	content?: string;
	created_at: string;
	updated_at: string;
}

export interface StarCustomerStats {
	total: number;
	averageRating: number;
	distribution: {
		[key: number]: number;
	};
}

export interface StarCustomerResponse {
	success: boolean;
	message: string;
	data: StarCustomer[];
}
