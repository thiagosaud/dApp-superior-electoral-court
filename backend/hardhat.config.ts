import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import "solidity-coverage";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";

const CONFIG: HardhatUserConfig = {
	solidity: "0.8.17",
	defaultNetwork: "hardhat",
	paths: {
		root: "./",
		artifacts: "./artifacts",
		cache: "./cache",
		sources: "./src/contracts",
		tests: "./src/test",
	},
	gasReporter: {
		enabled: true,
		currency: "BRL",
	},
};

export default CONFIG;
