![SOCIAL PREVIEW](https://raw.githubusercontent.com/thiagosaud/dApp-superior-electoral-court/main/temp/imgs/social-preview.png 'DAPP SUPERIOR ELECTORAL COURT BY THIAGO SAUD')

#

<p align="center">
  <img src="https://img.shields.io/github/stars/thiagosaud/dApp-superior-electoral-court?style=social" />
  <img src="https://img.shields.io/github/forks/thiagosaud/dApp-superior-electoral-court?style=social" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/thiagosaud/dApp-superior-electoral-court?color=%2362df5e&logoColor=%2362df5e" />
  <img src="https://img.shields.io/github/sponsors/thiagosaud?color=%2362df5e&logoColor=%2362df5e" />
  <img src="https://img.shields.io/github/languages/count/thiagosaud/dApp-superior-electoral-court?color=%2362df5e&logoColor=%2362df5e" />
  <img src="https://img.shields.io/github/v/release/thiagosaud/dApp-superior-electoral-court?include_prereleases?color=%2362df5e&logoColor=%2362df5e" />
  <img src="https://img.shields.io/github/last-commit/thiagosaud/dApp-superior-electoral-court?color=%2362df5e&logoColor=%2362df5e" />
</p>

## :rocket: About the Project

_This is a work of my own, where I use [REACTJS](https://reactjs.org/), [SMART CONTRACT TECHNOLOGY (SOLIDITY)](https://docs.soliditylang.org/en/v0.8.17/), [BLOCKCHAIN](https://en.wikipedia.org/wiki/Blockchain), [WEB3](https://web3.foundation/about/) [ETHERS](https://www.npmjs.com/package/ethers), [HARDHAT](https://hardhat.org/hardhat-runner/docs/) and [METAMASK](https://metamask.io/) to simulate [TSE](https://www.tse.jus.br/) ballot boxes, and most importantly, with transparent votes and without it being possible to tamper with them in any way._

This project will be a monorepository, where it will contain the root hierarchy and two hierarchies, which are:

- **FRONTEND (Web3)**
- **BACKEND (Smart Contracts with Solidity)**

Each project will contain its own hierarchy and dependency control, so to learn more about each project, go to each project's main folder.

:link: [To interact with the project you can access this link [CLICK HERE]](https://dapp-superior-electoral-court-thiagosaud.vercel.app/)

## :infinity: CI/CD

This project has the following controls:

**FRONTEND WORKFLOW**

| JOB NAME      | DESCRIPTION                       |
| ------------- | --------------------------------- |
| RUN PRETTIER  | Test the Style-Guide.             |
| RUN STYLELINT | Test styling with CSS-In-JS.      |
| RUN LINT      | Test Syntax Analisys of the code. |
| RUN JEST      | Unit Test with JEST.              |

**BACKEND WORKFLOW**

| JOB NAME           | DESCRIPTION                             |
| ------------------ | --------------------------------------- |
| RUN PRETTIER       | Test the Style-Guide.                   |
| RUN LINT CONTRACTS | Test Syntax Analisys of the .sol codes. |
| RUN LINT ALL FILES | Test Syntax Analisys of the all files.  |
| RUN MOCHA AND CHAI | Unit Test with MOCHA and Chai.          |

**DECRYPT SECRET KEYS**

| JOB NAME                  | DESCRIPTION                                                                                                                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RUN SECRET KEY DECRYPTION | Decrypts the secret environments that are in the github repository. Encrypt them using OPENSSL with a login and password to which only I have access to obtain them and create the .ENV file. |

**WORKFLOW CONTROLLER**

| JOB NAME | DESCRIPTION                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| FRONTEND | RUN THE FRONTEND WORKFLOW.                                                                                    |
| BACKEND  | RUN THE BACKEND WORKFLOW. It is necessary to wait for the FRONTEND workflow to pass all the tests.            |
| DEPLOY   | RUN THE VERCEL WORKFLOW. It is necessary to wait for the FRONTEND and BACKEND workflow to pass all the tests. |

## :electric_plug: How it works

![HOW IT WORKS PREVIEW](https://raw.githubusercontent.com/thiagosaud/dApp-superior-electoral-court/main/temp/imgs/how-its-work.png 'DAPP SUPERIOR ELECTORAL COURT BY THIAGO SAUD')

This is a simple working flow, which was covered in this project.

Where the voter is required to connect his cryptocurrency wallet to the system (_metamask_), and he is identified through the unique hash that the wallet has.

Soon after, it is necessary for him to have an X amount of the token to be used by the system, in this case we are using _ethereum_.

The system validates the connection of your wallet and the necessary amount of _ethereum_, if everything is correct, the voting actions are released for it.

The voter chooses his candidate and the system (_web + ethers_) validates the form and processes the data, along with the _hash_ of his wallet and the necessary amount of _ethereum_ needed for this on the _blockchain_ (_where the contract is located_).

In the _blockchain_, a block is generated in the _blockchain_, where the miner validates that block.

After the validation of that bit, which would actually be the processing of the contract that is part of a program (_where you can find who voted, who voted for and when they voted_).

After processing, the data is saved on the _blockchain_ forever and can never be tampered with and the system (_web + ethers_) receives real-time voting information as if it were _websockets_.

**⚠️ Note: That it is not necessary to handle the data from the electronic voting machine to do the accounting and save the data, in addition, the blockchain works like an accounting ledger, it is not and cannot be tampered with, maintaining consistency and legitimacy in its information.**

**⚠️ Note II: Remember that this is an approach to present the power of the blockchain and its legitimacy towards the data, but to make the "electronic voting machine" even more secure, the government must use unique hash of wallets interconnected with the document of each citizen and use facial recognition and (human) object detection to distinguish siblings, images of real people and to further reinforce, use fingerprint identification.**

## :memo: License

See the [LICENSE](LICENSE) for more details.

## :heartpulse: Sponsor

Made with ♥ and with the intention of learning and passing on knowledge.

So that I can work full-time and open to the community, thus bringing more relevance and technological solutions. It would mean a lot to me and the whole community if you help me reach this goal.

[![MY SPONSORS](https://img.shields.io/static/v1?label=SPONSOR&message=CLICK&style=for-the-badge&logo=GitHubSponsors&color=EA4AAA)](https://github.com/sponsors/thiagosaud)

---
