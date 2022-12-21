import { chain } from 'mathjs';

interface IUseCalculator {
	sum: (values: number[]) => number;
	toPercentage: (valueA: number, valueB: number) => number;
}

/**
 * @thiagosaud
 * @description This hook is exclusive to control the voting calculations!
 * @interface IUseCalculator
 */
export default function useCalculatorHook(): IUseCalculator {
	const isZeroValue = (value: number) => chain(value).isZero().done();

	const sum = (values: number[]) => chain(values).sum().done();

	const toPercentage = (valueA: number, valueB: number) =>
		isZeroValue(valueA) || isZeroValue(valueB)
			? chain(0).done()
			: chain(chain(valueA).divide(valueB).multiply(100).done().toPrecision(3)).number().done();

	return {
		sum,
		toPercentage,
	};
}
