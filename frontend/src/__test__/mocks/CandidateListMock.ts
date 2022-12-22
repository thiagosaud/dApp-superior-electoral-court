export interface IData {
	number: number;
	votesConfirmed: {
		total: number;
		totalPercentage: number;
	};
}

export interface IProps {
	onConfirmVote: (number: number) => void;
	hasVoted: boolean;
	data: IData[];
}

const MOCKED_DATA: IData[] = [
	{
		number: 1,
		votesConfirmed: {
			total: 124252799,
			totalPercentage: 99.99,
		},
	},
	{
		number: 2,
		votesConfirmed: {
			total: 124252796,
			totalPercentage: 99.59,
		},
	},
	{
		number: 3,
		votesConfirmed: {
			total: 124252796,
			totalPercentage: 99.59,
		},
	},
	{
		number: 4,
		votesConfirmed: {
			total: 124252796,
			totalPercentage: 99.59,
		},
	},
	{
		number: 5,
		votesConfirmed: {
			total: 124252796,
			totalPercentage: 99.59,
		},
	},
	{
		number: 6,
		votesConfirmed: {
			total: 124252796,
			totalPercentage: 99.59,
		},
	},
];

export default MOCKED_DATA;
