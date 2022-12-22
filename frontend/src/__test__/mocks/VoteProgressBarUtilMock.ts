export interface IProps {
	votes: {
		confirmed: number;
		abstention: number;
	};
}

const MOCKED_DATA: IProps = {
	votes: {
		confirmed: 99.99,
		abstention: 89.85,
	},
};

export default MOCKED_DATA;
