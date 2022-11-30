// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title IHelper
 * @dev Interfaces shared between contracts
 */
interface IHelper {
	/** @dev Polling calculation **/
	struct Vote {
		uint total;
	}

	/** @dev Confirming Votes **/
	struct Confirmed {
		uint candidate;
		address[] elector;
		Vote vote;
	}

	/** @dev Abstention Votes **/
	struct Abstention {
		address[] elector;
		Vote vote;
	}

	/** @dev Election Result **/
	struct ElectionResult {
		uint[6] candidates;
		uint totalConfirmedVotes;
		Confirmed[6] confirmedVotes;
		Abstention abstentionVotes;
	}
}
