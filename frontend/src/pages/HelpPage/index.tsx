import { MouseEventHandler, memo, useCallback, useEffect } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { BsGithub } from 'react-icons/bs';
import { FaEthereum } from 'react-icons/fa';
import { SiLinkedin } from 'react-icons/si';
import { MdArrowBack } from 'react-icons/md';
import styled from 'styled-components';
import PageTemplate from 'templates/PageTemplate';
import useRouteNavigationHook from 'hooks/useRouteNavigationHook';
import { useStorageDBProviderHook } from 'providers/useStorageDBProvider';

const AccordionItem = styled(Accordion.Item)`
	text-align: justify;
`;

const WrapperButton = styled.div`
	display: flex;
	gap: 0.5rem;
	align-items: center;
`;

function HelpPage() {
	const useStorageDBProvider = useStorageDBProviderHook();
	const useRouteNavigation = useRouteNavigationHook();

	const HyperlinkButton = useCallback(
		({
			onClick,
			title,
			icon,
		}: {
			onClick: MouseEventHandler<HTMLButtonElement>;
			title: 'MY PROFILE' | 'PROJECT CODE' | 'CONTRACT ON BLOCKCHAIN' | 'GOERLI FAUCET' | 'BACK';
			icon: 'linkedin' | 'github' | 'eth' | 'back';
		}) => (
			<Button onClick={onClick} variant={title === 'BACK' ? 'light' : 'primary'} className='d-flex align-items-center gap-2' size='sm'>
				{icon === 'back' && <MdArrowBack size='35' color='var(--bs-yellow)' />}
				{icon === 'linkedin' && <SiLinkedin size='30' color='white' />}
				{icon === 'github' && <BsGithub size='30' color='white' />}
				{icon === 'eth' && <FaEthereum size='30' color='white' />}

				{title}
			</Button>
		),
		[]
	);

	const BreakTwoLines = useCallback(
		() => (
			<>
				<br />
				<br />
			</>
		),
		[]
	);

	useEffect(() => {
		if (!useStorageDBProvider.dataCached.metamask) {
			useRouteNavigation.goToHomePage();
		}
	}, [useStorageDBProvider, useRouteNavigation]);

	return (
		<PageTemplate>
			<HyperlinkButton onClick={() => useRouteNavigation.goToHomePage()} title='BACK' icon='back' />

			<Accordion defaultActiveKey='0' className='mt-4'>
				<AccordionItem eventKey='0'>
					<Accordion.Header>How the project works?</Accordion.Header>
					<Accordion.Body>
						The Electoral Ballot Box in this case is the blockchain, in this case, we are using Ethereum. A blockchain is a ledger, where
						this ledger is decentralized and cannot be tampered with and is public. Knowing this, all votes, candidates and results are
						stored in real time on the blockchain.
						<BreakTwoLines />
						For the voter to vote for his candidate, he must have ETH in his digital cryptocurrency wallet, in this case the system uses
						MetaMask. The digital wallet would represent some document of the voter, which would be registered in some government agency,
						being enabled to vote. As soon as the voter votes, a transaction request is made on the blockchain, where miners receive this
						request and mine the block. For this mining to be done, the only fee charged in the contract is the gas fee and nothing else.
						<BreakTwoLines />
						The gas fee is a mandatory fee for rewarding miners, in this case the fee for this voting system is around $0.38. In this
						contract, the voter pays the fee, but in a real contract, the government could commit to paying these fees.
						<BreakTwoLines />
						After successfully completed mining, the vote is saved on the blockchain, for your candidate if it is confirmed, or for
						abstention if you do not want to vote for any candidate. All results are issued in real time directly from the blockchain! It is
						not possible to multiple votes with the same wallet, the contract contains a protection against this and will reverse the entire
						transaction!
						<BreakTwoLines />
						<strong>
							*Disclaimer: As it is a portfolio project, it does not strictly follow the rules of reality, so you can create another
							portfolio and use it for voting, simulating another voter, with another document.
						</strong>
						<BreakTwoLines />
						Magical isnt it?
						<br />
						Below is the link to the contract and my social networks, feel free to follow me and like the project repository, maybe a
						donation too?
						<BreakTwoLines />
						<WrapperButton>
							<HyperlinkButton onClick={() => useRouteNavigation.openMyProfilePage()} title='MY PROFILE' icon='linkedin' />
							<HyperlinkButton onClick={() => useRouteNavigation.openGithubPage()} title='PROJECT CODE' icon='github' />
							<HyperlinkButton onClick={() => useRouteNavigation.openContractPage()} title='CONTRACT ON BLOCKCHAIN' icon='eth' />
						</WrapperButton>
					</Accordion.Body>
				</AccordionItem>

				<AccordionItem eventKey='1'>
					<Accordion.Header>How to get free ETH to vote?</Accordion.Header>
					<Accordion.Body>
						The main network is called &quot;mainnet&quot;, and this contract was implemented in the network called &quot;GOERLI&quot;. The
						&quot;GOERLI&quot; network is the test network (homologation), however, it simulates the main &quot;mainnet&quot; network, where
						it has the same miners and infrastructure. Knowing this, in this network it is enough just to get the tokens called
						&quot;GoerliETH&quot;.
						<BreakTwoLines />
						To get these tokens, there are thousands of sites called &quot;faucets&quot;, but just below, you will find some of them:
						<BreakTwoLines />
						<HyperlinkButton onClick={() => useRouteNavigation.openGoerliFaucetPage()} title='GOERLI FAUCET' icon='eth' />
						<br />
						After accessing them, just insert your public wallet key and &quot;fly it&quot;, you will receive the &quot;GoerliETH&quot; to
						interact with the contract (System).
						<BreakTwoLines />
						<strong>
							*Disclaimer: In this system (contract) there is no potential danger, even I developed it myself. However, for your safety, use
							a wallet that you will not use in the real world.
						</strong>
					</Accordion.Body>
				</AccordionItem>
			</Accordion>
		</PageTemplate>
	);
}

export default memo(HelpPage);
