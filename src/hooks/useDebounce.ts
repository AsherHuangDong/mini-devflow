import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
	const [newValue, setNewValue] = useState(value);

	useEffect(() => {
		let timer = 0;

		if (timer) {
			clearTimeout(timer);
			timer = 0;
		}

		timer = setTimeout(() => {
			setNewValue(value);
		}, delay);

		return () => clearTimeout(timer);
	}, [value, delay]);

	return newValue;
};

export default useDebounce;
