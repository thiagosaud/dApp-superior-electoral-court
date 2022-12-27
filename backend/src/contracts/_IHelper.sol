// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title IHelper
 * @dev Interfaces shared between contracts
 */
interface IHelper {
	/** @dev Confirming Votes **/
	struct Confirmed {
		uint candidate;
		address[] electors;
		uint totalVotes;
	}

	/** @dev Abstention Votes **/
	struct Abstention {
		address[] electors;
		uint totalVotes;
	}

	/** @dev Election Result **/
	struct ElectionResult {
		uint[6] candidates;
		uint totalConfirmedVotes;
		Confirmed[6] confirmedVotes;
		Abstention abstentionVotes;
	}
}
