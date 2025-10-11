export interface ApiError {
	response?: {
		data?: {
			message?: string;
			code?: number;
			status?: string;
		};
	};
	message?: string;
}
