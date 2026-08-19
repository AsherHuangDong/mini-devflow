export type ApiErrorType = 'NETWORK_ERROR' | 'HTTP_ERROR' | 'BUSINESS_ERROR' | 'ABORT_ERROR';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestConfig {
	url: string;
	method: HttpMethod;
	params?: Record<string, string>;
	data?: unknown;
	headers?: Record<string, string>;
	signal?: AbortSignal;
}

export interface ApiResponse<T> {
	code: number;
	data: T;
	message: string;
}
