export interface StarCustomer {
	id: number;
	nameCustomer: string;
	star: number;
	content?: string;
	createdAt: string;
	updatedAt: string;
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
