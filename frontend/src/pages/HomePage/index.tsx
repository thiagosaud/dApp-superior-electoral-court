import { Suspense, memo, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import PageTemplate from 'templates/PageTemplate';
import VotingStatisticList from 'components/Lists/VotingStatisticList';
import CandidateListSkeleton from 'components/Skeletons/CandidateListSkeleton';
import GenericSkeleton from 'components/Skeletons/GenericSkeleton';
import { LazyAbstainVoteButton, LazyCandidateList } from 'utils/LazyLoadingComponents';
import { useSolidityContractProviderHook } from 'providers/useSolidityContractProvider';
import { useStorageDBProviderHook } from 'providers/useStorageDBProvider';
import { TypeInfuraStorageData, TypeInfuraData } from 'hooks/useStorageDBHook';
import useCalculatorHook from 'hooks/useCalculatorHook';

function HomePage() {
	const useStorageDBProvider = useStorageDBProviderHook();
	const useSolidityContractProvider = useSolidityContractProviderHook();
	const useCalculator = useCalculatorHook();
	const [electoralResult, setElectoralResult] = useState<TypeInfuraStorageData>(null);
	const [isVoting, updateIsVoting] = useReducer((state: boolean) => !state, false);

	const votes = useMemo(() => {
		const TOTAL_CONFIRMED_VOTES = electoralResult?.totalConfirmedVotes || 0;
		const TOTAL_ABSTENTION_VOTES = electoralResult?.abstentionVotes.totalVotes || 0;
		const TOTAL_VOTES = useCalculator.sum([TOTAL_CONFIRMED_VOTES, TOTAL_ABSTENTION_VOTES]);

		return {
			confirmed: {
				total: TOTAL_CONFIRMED_VOTES,
				totalPercentage: useCalculator.toPercentage(TOTAL_CONFIRMED_VOTES, TOTAL_VOTES),
			},
			abstention: {
				total: TOTAL_ABSTENTION_VOTES,
				totalPercentage: useCalculator.toPercentage(TOTAL_ABSTENTION_VOTES, TOTAL_VOTES),
			},
		};
	}, [useCalculator, electoralResult]);

	const isDisabledVoteButton = useMemo(() => {
		const WALLET_CONNECTED = useStorageDBProvider.dataCached.metamask;

		if (electoralResult && WALLET_CONNECTED) {
			const compare = (electorWallet: string, walletConnected: string) => electorWallet.toUpperCase() === walletConnected.toUpperCase();

			const ELECTOR_ABSTENTION_VOTE = electoralResult.abstentionVotes.electors.find(wallet => compare(wallet, WALLET_CONNECTED));
			const ELECTOR_CONFIRMED_VOTE = electoralResult.confirmedVotes.find(({ electors }) =>
				electors.find(wallet => compare(wallet, WALLET_CONNECTED))
			);

			return !!(ELECTOR_ABSTENTION_VOTE || ELECTOR_CONFIRMED_VOTE);
		}

		return !WALLET_CONNECTED;
	}, [useStorageDBProvider, electoralResult]);

	const getCandidateList = useCallback(
		({ confirmedVotes, totalConfirmedVotes }: TypeInfuraData) =>
			confirmedVotes.map(({ candidate, totalVotes }) => ({
				number: candidate,
				votesConfirmed: {
					total: totalVotes,
					totalPercentage: useCalculator.toPercentage(totalVotes, totalConfirmedVotes),
				},
			})),
		[useCalculator]
	);

	const cacheData = useCallback(() => {
		setElectoralResult(useStorageDBProvider.dataCached.infura);

		if (!electoralResult) {
			useSolidityContractProvider.actions.getElectoralResult().then(response => setElectoralResult(response));
		}
	}, [electoralResult, useStorageDBProvider, useSolidityContractProvider]);

	const handleOnAbstainVote = useCallback(() => {
		updateIsVoting();
		useSolidityContractProvider.actions.abstainVote().finally(() => updateIsVoting());
	}, [useSolidityContractProvider]);

	const handleOnConfirmVote = useCallback(
		(candidateID: number) => {
			updateIsVoting();
			useSolidityContractProvider.actions.confirmVote(candidateID).finally(() => updateIsVoting());
		},
		[useSolidityContractProvider]
	);

	useEffect(() => cacheData(), [cacheData]);

	return (
		<PageTemplate>
			<VotingStatisticList isLoading={!votes} votes={votes} />

			<div className='mt-4 mb-3 d-flex justify-content-between align-items-center'>
				<h5 className='mb-0'>President</h5>

				<Suspense fallback={<GenericSkeleton height='38px' width='172px' />}>
					<LazyAbstainVoteButton onAbstainVote={handleOnAbstainVote} isDisabled={isDisabledVoteButton || isVoting} />
				</Suspense>
			</div>

			{!electoralResult ? (
				<CandidateListSkeleton />
			) : (
				<Suspense fallback={<CandidateListSkeleton />}>
					<LazyCandidateList
						onConfirmVote={handleOnConfirmVote}
						data={getCandidateList(electoralResult)}
						hasVoted={isDisabledVoteButton || isVoting}
					/>
				</Suspense>
			)}
		</PageTemplate>
	);
}

export default memo(HomePage);
