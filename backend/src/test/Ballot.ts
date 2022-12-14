import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";

interface ConfirmedVote {
	candidate: number;
	electors: string[];
	totalVotes: number;
}

interface IAbstentionVotes {
	electors: string[];
	totalVotes: number;
}

interface IGetResult {
	candidates: number[];
	totalConfirmedVotes: number;
	confirmedVotes: ConfirmedVote[];
	abstentionVotes: IAbstentionVotes;
}

let contractFactory: ContractFactory;
let contract: Contract;

before(async () => {
	contractFactory = await ethers.getContractFactory("Ballot");
	contract = await contractFactory.deploy();
});

describe("Ballot [Contract]", () => {
	it("Should be exist the Contract!", async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		expect(contract.address).to.be.a.properAddress;
	});

	it("Should have emit the event at the beginning of the Election Period!", async () => {
		await expect(contract.deployTransaction)
			.to.emit(contract, "LogStartElection")
			.withArgs("Beginning of the election period, ballot box released!", anyValue);
	});
});

describe("Ballot [Initial Data]", () => {
	describe("Candidates", () => {
		let confirmedVotes: ConfirmedVote[];

		beforeEach(async () => {
			const RESULT: IGetResult = await contract.getResult();
			confirmedVotes = RESULT.confirmedVotes;
		});

		it("Should have Six (6) Candidates!", () => {
			expect(confirmedVotes).to.have.lengthOf(6);
		});
	});

	describe("Votes", () => {
		let totalConfirmedVotes: number;
		let confirmedVotes: ConfirmedVote[];
		let abstentionVotes: IAbstentionVotes;

		beforeEach(async () => {
			const RESULT: IGetResult = await contract.getResult();

			totalConfirmedVotes = RESULT.totalConfirmedVotes;
			confirmedVotes = RESULT.confirmedVotes;
			abstentionVotes = RESULT.abstentionVotes;
		});

		describe("Total Confirmed", () => {
			it("Should have Zero (0) Votes!", () => {
				expect(totalConfirmedVotes).to.equal(0);
			});
		});

		describe("Confirmed", () => {
			it("Should have Six (6) Candidates!", () => {
				expect(confirmedVotes).to.have.lengthOf(6);

				confirmedVotes.forEach(({ candidate }, index) => {
					expect(candidate).to.equal(index);
				});
			});

			it("Should have Zero (0) Electors!", () => {
				confirmedVotes.forEach(({ electors }) => {
					expect(electors).to.have.lengthOf(0);
				});
			});

			it("Should have Zero (0) Total Votes!", () => {
				confirmedVotes.forEach(({ totalVotes }) => {
					expect(totalVotes).to.equal(0);
				});
			});
		});

		describe("Abstention", () => {
			it("Should have Zero (0) Total Votes!", () => {
				expect(abstentionVotes.totalVotes).to.equal(0);
			});

			it("Should have Zero (0) Electors!", () => {
				expect(abstentionVotes.electors).to.have.lengthOf(0);
			});
		});
	});
});

describe("Ballot [Vote]", () => {
	let signers: SignerWithAddress[] = [];

	beforeEach(async () => {
		signers = await ethers.getSigners();
	});

	it("Should have Electors able to Vote!", async () => {
		[0, 1, 2, 3, 4, 5].forEach(async index => {
			await expect(contract.connect(signers[index]).confirmVote(index)).not.to.be.reverted;
		});

		[6, 7, 8, 9, 10, 11].forEach(async index => {
			await expect(contract.connect(signers[index]).abstainVote()).not.to.be.reverted;
		});

		await expect(contract.connect(signers[12]).confirmVote(0))
			.to.emit(contract, "LogElectorVote")
			.withArgs("Vote Confirmed and Computed!", anyValue);

		await expect(contract.connect(signers[13]).abstainVote())
			.to.emit(contract, "LogElectorVote")
			.withArgs("Vote Abstained and Computed!", anyValue);
	});

	it("Should have Six (7) Electors Confirmed Votes!", async () => {
		const RESULT: IGetResult = await contract.getResult();

		expect(RESULT.totalConfirmedVotes).to.be.equal(7);

		RESULT.confirmedVotes.forEach(({ totalVotes, electors }, index) => {
			const CANDIDATE_ID = index;

			expect(totalVotes).to.be.equal(CANDIDATE_ID === 0 ? 2 : 1);
			expect(electors).to.be.lengthOf(CANDIDATE_ID === 0 ? 2 : 1);
		});
	});

	it("Should have Six (7) Electors Abstention Votes!", async () => {
		const RESULT: IGetResult = await contract.getResult();

		expect(RESULT.abstentionVotes.totalVotes).to.be.equal(7);
		expect(RESULT.abstentionVotes.electors).to.be.lengthOf(7);
	});

	it("Should block the Elector vote if the candidate does not exist!", async () => {
		await expect(contract.connect(signers[0]).confirmVote(10)).to.be.revertedWith("This candidate don't exist!");
	});

	it("Should block the same Elector who has already voted!", async () => {
		await expect(contract.connect(signers[0]).confirmVote(0)).to.be.revertedWith("This elector already voted!");
		await expect(contract.connect(signers[0]).abstainVote()).to.be.revertedWith("This elector already voted!");
	});
});
