export const getStorage = (key: string): string | null => {
	return localStorage.getItem(key);
};

export const setStorage = (key: string, value: string): void => {
	localStorage.setItem(key, value);
};

export const removeStorage = (key: string): void => {
	localStorage.removeItem(key);
};

export const clearStorage = (): void => {
	localStorage.clear();
};
