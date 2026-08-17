import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay: number): T => {
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
