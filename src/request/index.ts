import { buildQueryString } from '../tools';
import { ApiError } from './error';
import type { RequestConfig } from './types';

const BASE_URL = 'http://localhost:3000';

export const request = async <T>(config: RequestConfig): Promise<T> => {
	let url = config.url.startsWith('http') ? config.url : `${BASE_URL}${config.url}`;

	const fetchConfig: RequestInit = {
		headers: {
			'Content-Type': 'application/json',
			...config?.headers,
		},
		method: config.method,
		body: config?.data ? JSON.stringify(config.data) : undefined,
		signal: config?.signal,
	};

	if (config?.params) {
		const paramsString = buildQueryString(config.params);
		const urlHasParams = url.includes('?');
		url = urlHasParams ? `${url}&${paramsString}` : `${url}?${paramsString}`;
	}

	const response = await fetch(url, fetchConfig);

	const status = response.status;

	if (status >= 400 || status >= 500) {
		throw new ApiError(response.statusText, { type: 'HTTP_ERROR', status });
	}

	if (!response.ok) {
		throw new ApiError(response.statusText, { type: 'NETWORK_ERROR', status });
	}

	const res = await response.json();

	if (res.code === 10001) {
		throw new ApiError(response.statusText, { type: 'BUSINESS_ERROR', status });
	}

	/**
     * 网络断开
        → type = NETWORK_ERROR

        主动取消
        → type = ABORT_ERROR
        todo: 以上两个不知道怎么获取
     */
	return res.data;
};
