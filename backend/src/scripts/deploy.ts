import { ethers } from "hardhat";

/* eslint-disable no-console */
async function main() {
	const INFURA_PROVIDER = ethers.providers.InfuraProvider.getWebSocketProvider();
	const INFURA_WALLET_OWNER = new ethers.Wallet(`${process.env.WALLET_PRIVATE_KEY}`, INFURA_PROVIDER);
	const INFURA_WALLET_ADDRESS = await INFURA_WALLET_OWNER.getAddress();

	const CONTRACT_FACTORY = await ethers.getContractFactory("Ballot");
	const CONTRACT = await CONTRACT_FACTORY.deploy();

	await CONTRACT.deployed();

	const INFURA_CONTRACT_BALANCE = await INFURA_PROVIDER.getBalance(CONTRACT.address);

	console.log("[INFURA:GOERLI] Contract deployed to:", CONTRACT.address);
	console.log("[INFURA:GOERLI] Deploying contracts with account: ", INFURA_WALLET_ADDRESS);
	console.log("[INFURA:GOERLI] Account balance: ", INFURA_CONTRACT_BALANCE);
}

const runMain = async () => {
	try {
		await main();
		process.exit(0); // exit Node process without error
	} catch (error) {
		console.log(error);
		process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
	}
};

runMain();
