import { renderHook } from '@testing-library/react';
import useNumberConversion from './useNumberConversion';

const CURRENCY_VALUE = 124252799;
const PERCENTAGE_VALUE = 99.99;

describe('[NUMBER CONVERSION HOOK] - Testing Hook', () => {
	const { result } = renderHook(() => useNumberConversion());

	test('Should be have the functions!', () => {
		expect(result.current.convertToCurrency(CURRENCY_VALUE)).toBeTruthy();
		expect(result.current.convertToPercentage(PERCENTAGE_VALUE)).toBeTruthy();
	});

	test('Should be type string output!', () => {
		expect(typeof result.current.convertToCurrency(CURRENCY_VALUE)).toBe('string');
		expect(typeof result.current.convertToPercentage(PERCENTAGE_VALUE)).toBe('string');
	});

	test('Should be convertToCurrency greater or equal 0!', () => {
		expect(parseFloat(result.current.convertToCurrency(CURRENCY_VALUE))).toBeGreaterThanOrEqual(0);
	});

	test('Should be convertToPercentage greater or equal 0% and less or equal 100%!', () => {
		const percentageValue = parseFloat(result.current.convertToPercentage(PERCENTAGE_VALUE).replace(',', '.'));

		expect(percentageValue).toBeGreaterThanOrEqual(0);
		expect(percentageValue).toBeLessThanOrEqual(100);
	});
});
