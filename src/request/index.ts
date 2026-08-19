import { ApiError } from './error';
import type { ApiResponse, RequestConfig } from './types';

const BASE_URL = 'http://localhost:3000';

export const request = async <T>(config: RequestConfig): Promise<ApiResponse<T>> => {
	let url = config.url.startsWith('http') ? config.url : `${BASE_URL}${config.url}`;

	const fetchConfig = {
		hearers: {
			'Content-Type': 'application/json',
			...config?.headers,
		},
		method: config.method,
		body: config?.data ? JSON.stringify(config.data) : undefined,
		signal: config?.signal,
	} as RequestInit;

	if (config?.params) {
		url = `${url}?${new URLSearchParams(config.params).toString()}`;
	}

	// todo: 不知道取消请求目前是怎么做的，先直接抛出错误
	if (config?.signal) {
		throw new ApiError('请求已取消', { type: 'ABORT_ERROR' });
	}
	const response = await fetch(url, fetchConfig);
	return response.json();
};
