// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./_IHelper.sol";

/**
 * @title Logging
 * @dev It brings reliability to the results of the contract
 */
abstract contract Logging is IHelper {
	event LogStartElection(string msg, ElectionResult);
	event LogElectorVote(string msg, ElectionResult);
}
