import { useCallback } from 'react';

export default function useNumberConversion() {
	const convertToCurrency = useCallback((value: number) => new Intl.NumberFormat('pt-br', {}).format(value), []);

	const convertToPercentage = useCallback(
		(value: number) => new Intl.NumberFormat('pt-br', { style: 'percent', maximumFractionDigits: 2 }).format(value / 100),
		[]
	);

	return {
		convertToCurrency,
		convertToPercentage,
	};
}
