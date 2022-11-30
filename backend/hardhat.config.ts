import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";
import "hardhat-gas-reporter";
import { HardhatUserConfig, task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import * as dotenv from "dotenv";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
/* eslint-disable no-console */
task("accounts", "Prints the list of accounts", async ({ hre }: { hre: HardhatRuntimeEnvironment }) => {
	const accounts = await hre.ethers.getSigners();
	accounts.forEach(account => console.log(account.address));
});

const CONFIG: HardhatUserConfig = {
	solidity: "0.8.17",
	defaultNetwork: "goerli",
	paths: {
		root: "./",
		artifacts: "./artifacts",
		cache: "./cache",
		sources: "./src/contracts",
		tests: "./src/test",
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_PRIVATE_KEY,
	},
	gasReporter: {
		enabled: true,
		currency: "BRL",
	},
	networks: {
		goerli: {
			url: process.env.INFURA_GOERLI_URL,
			accounts: process.env.WALLET_PRIVATE_KEY ? [process.env.WALLET_PRIVATE_KEY] : [],
		},
	},
};

export default CONFIG;
