export function debounce<T extends (...args: never[]) => unknown>(
	fn: T,
	delay: number,
	immediate: boolean = false
) {
	let timer: ReturnType<typeof setTimeout> | null = null;
	let lastArgs: Parameters<T> | null = null;

	function debounced(this: ThisParameterType<T>, ...args: Parameters<T>): void {
		lastArgs = args;

		const callNow = immediate && !timer;
		console.log(callNow, timer);

		if (timer) clearTimeout(timer);

		timer = setTimeout(() => {
			timer = null;
			if (!immediate && lastArgs) {
				fn.apply(this, lastArgs);
				lastArgs = null;
			}
		}, delay);

		if (callNow) {
			fn.apply(this, lastArgs);
			lastArgs = null;
		}
	}

	debounced.cancel = () => {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
		lastArgs = null;
	};

	return debounced;
}

// export function throttle(fn, delay, immediate = false) {
// 	let timer = null;
// 	let lastArgs = null;
// 	let lastTime = null;

// 	return function (this, ...args) {
// 		const now = new Date().getTime();
// 		const callNow = immediate && !timer && !lastTime;

// 		if (callNow) {
// 			fn.apply(this, lastArgs);
// 			lastArgs = null;
// 			lastTime = null;
// 		}

// 		if (lastTime && now - lastTime < delay) {
// 			clearTimeout(timer);
// 			timer = setTimeout(() => {
// 				lastArgs = null;
// 				lastTime = null;
// 				fn.apply(this, lastArgs);
// 			}, delay);
// 		} else {
// 			lastTime = now;
// 			lastArgs = args;
// 			fn.apply(this, lastArgs);
// 		}
// 	};
// }

type QueryParams = Record<string, unknown>;

export const buildQueryString = (params: QueryParams): string => {
	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (value === undefined) {
			continue;
		}

		searchParams.set(key, typeof value === 'string' ? value : JSON.stringify(value));
	}

	return searchParams.toString();
};

export const parseQueryString = (queryString: string): QueryParams => {
	const searchParams = new URLSearchParams(
		queryString.startsWith('?') ? queryString.slice(1) : queryString
	);

	const result: QueryParams = {};

	for (const [key, value] of searchParams.entries()) {
		try {
			result[key] = JSON.parse(value);
		} catch {
			result[key] = value;
		}
	}

	return result;
};
