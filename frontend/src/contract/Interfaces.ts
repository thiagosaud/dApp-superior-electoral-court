/**
 * @thiagosaud
 * @description This file is exclusive to control the Types and Interfaces of the {Compiled Smart Contract}!
 */

/** @description This type is exclusive to control the BigNumber returns of the contract! */
type TypeBigNumber = { _hex: string; _isBigNumber: number };

/** @description This type is exclusive to control fragments of contract functions! */
export type TypeBallotContractFunctionFragment = 'confirmVote' | 'abstainVote';

/** @description This type is exclusively for handling contract function return fragments! */
export type TypeBallotContractFunctionFragmentParams = number[];

/** @description This interface is exclusive to control the gross return of the contract! */
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

/** @description This interface is exclusive to control the conversion of the contract's gross return! */
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
