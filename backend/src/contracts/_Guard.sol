// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Guard
 * @dev To ensure the integrity of the contract.
 */
abstract contract Guard {
	/**
	 * @dev Ensures that voting will be for existing candidates.
	 * @param candidateID value to store
	 * @param candidateListLength value to store
	 */
	modifier onlyCandidateRegistered(uint candidateID, uint candidateListLength) {
		require(candidateID >= 0 && candidateID < candidateListLength, "This candidate don't exist!");
		_;
	}

	/**
	 * @dev Ensures that Electors who have already voted will not be able to vote again.
	 * @param hasAlreadyVoted value to store
	 */
	modifier onlyElectorWhoDidNotVote(bool hasAlreadyVoted) {
		require(!hasAlreadyVoted, "This elector already voted!");
		_;
	}
}
