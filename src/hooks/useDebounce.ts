import { useEffect, useState } from 'react';

const useDebounce = (value: unknown, delay: number) => {
	const [newValue, setNewValue] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setNewValue(value);
		}, delay);

		return () => clearTimeout(timer);
	}, [value, delay]);

	return newValue;
};

export default useDebounce;
