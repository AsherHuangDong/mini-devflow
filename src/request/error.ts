import type { ApiErrorType } from './types';

export class ApiError extends Error {
	type: ApiErrorType;
	status?: number;
	code?: string | number;
	data?: unknown;

	constructor(
		message: string,
		options: {
			type: ApiErrorType;
			status?: number;
			code?: string | number;
			data?: unknown;
		}
	) {
		super(message);

		this.name = 'ApiError';
		this.type = options.type;
		this.status = options.status;
		this.code = options.code;
		this.data = options.data;
	}
}
