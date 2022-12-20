type TypeBigNumber = { _hex: string; _isBigNumber: number };

export type TypeBallotContractFunctionFragment = 'confirmVote' | 'abstainVote';
export type TypeBallotContractFunctionFragmentParams = number[];

export interface IBallotContractGetResult {
	candidates: TypeBigNumber[];
	totalConfirmedVotes: TypeBigNumber;
	abstentionVotes: {
		electors: string[];
		totalVotes: TypeBigNumber;
	};
	confirmedVotes: {
		candidate: TypeBigNumber;
		electors: string[];
		totalVotes: TypeBigNumber;
	}[];
}

export interface IBallotContractGetResultConverted {
	candidates: number[];
	totalConfirmedVotes: number;
	abstentionVotes: {
		electors: string[];
		totalVotes: number;
	};
	confirmedVotes: {
		candidate: number;
		electors: string[];
		totalVotes: number;
	}[];
}
