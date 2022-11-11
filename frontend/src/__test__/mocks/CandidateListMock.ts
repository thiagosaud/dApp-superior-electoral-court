export interface IData {
	onConfirmVote: (number: number) => void;
	number: number;
	avatar: string;
	hasVoted: boolean;
	votesConfirmed: {
		total: number;
		totalPercentage: number;
	};
}

const MOCKED_DATA: IData[] = [
	{
		onConfirmVote: (number: number) => number,
		number: 1,
		avatar: 'https://raw.githubusercontent.com/thiagosaud/dApp-superior-electoral-court/main/temp/imgs/candidate-1.png',
		hasVoted: true,
		votesConfirmed: {
			total: 124252799,
			totalPercentage: 99.99,
		},
	},
	{
		onConfirmVote: (number: number) => number,
		number: 2,
		avatar: 'https://raw.githubusercontent.com/thiagosaud/dApp-superior-electoral-court/main/temp/imgs/candidate-2.png',
		hasVoted: false,
		votesConfirmed: {
			total: 124252796,
			totalPercentage: 99.59,
		},
	},
	{
		onConfirmVote: (number: number) => number,
		number: 3,
		avatar: 'https://raw.githubusercontent.com/thiagosaud/dApp-superior-electoral-court/main/temp/imgs/candidate-3.png',
		hasVoted: false,
		votesConfirmed: {
			total: 124252796,
			totalPercentage: 99.59,
		},
	},
	{
		onConfirmVote: (number: number) => number,
		number: 4,
		avatar: 'https://raw.githubusercontent.com/thiagosaud/dApp-superior-electoral-court/main/temp/imgs/candidate-4.png',
		hasVoted: false,
		votesConfirmed: {
			total: 124252796,
			totalPercentage: 99.59,
		},
	},
	{
		onConfirmVote: (number: number) => number,
		number: 5,
		avatar: 'https://raw.githubusercontent.com/thiagosaud/dApp-superior-electoral-court/main/temp/imgs/candidate-5.png',
		hasVoted: false,
		votesConfirmed: {
			total: 124252796,
			totalPercentage: 99.59,
		},
	},
	{
		onConfirmVote: (number: number) => number,
		number: 6,
		avatar: 'https://raw.githubusercontent.com/thiagosaud/dApp-superior-electoral-court/main/temp/imgs/candidate-6.png',
		hasVoted: false,
		votesConfirmed: {
			total: 124252796,
			totalPercentage: 99.59,
		},
	},
];

export default MOCKED_DATA;
