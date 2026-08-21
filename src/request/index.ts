import { buildQueryString } from '../tools';
import { ApiError } from './error';
import type { RequestConfig } from './types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const request = async <T>(config: RequestConfig): Promise<T> => {
	try {
		let url = config.url.startsWith('http') ? config.url : `${BASE_URL}${config.url}`;

		const fetchConfig: RequestInit = {
			headers: {
				'Content-Type': 'application/json',
				...config?.headers,
			},
			method: config.method,
			body: config.data !== undefined ? JSON.stringify(config.data) : undefined,
			signal: config?.signal,
		};

		if (config?.params) {
			const paramsString = buildQueryString(config.params);
			const urlHasParams = url.includes('?');
			url = urlHasParams ? `${url}&${paramsString}` : `${url}?${paramsString}`;
		}

		const response = await fetch(url, fetchConfig);

		if (!response.ok) {
			throw new ApiError('请求错误', {
				type: 'HTTP_ERROR',
				status: response.status,
			});
		}

		const res = await response.json();

		if (res.code !== 0) {
			throw new ApiError(res.message, {
				type: 'BUSINESS_ERROR',
				code: res.code,
			});
		}
		return res.data;
	} catch (error) {
		//  主动取消
		if (error instanceof DOMException && error.name === 'AbortError') {
			throw new ApiError('请求被取消', { type: 'ABORT_ERROR' });
		}

		// 业务错误
		if (error instanceof ApiError) {
			throw error;
		}

		// 网络错误
		throw new ApiError('网络错误', { type: 'NETWORK_ERROR' });
	}
};
