import { Suspense, memo, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { chain } from 'mathjs';
import PageTemplate from 'templates/PageTemplate';
import VotingStatisticList from 'components/Lists/VotingStatisticList';
import CandidateListSkeleton from 'components/Skeletons/CandidateListSkeleton';
import GenericSkeleton from 'components/Skeletons/GenericSkeleton';
import { LazyAbstainVoteButton, LazyCandidateList } from 'utils/LazyLoadingComponents';
import { useSolidityContractProvider } from 'providers/useSolidityContractProvider';
import { useStorageDBProviderHook } from 'providers/useStorageDBProvider';
import { TypeInfuraStorageData, TypeInfuraData } from 'hooks/useStorageDBHook';

function HomePage() {
	const useStorageDBProvider = useStorageDBProviderHook();
	const useSolidityContractProviderHook = useSolidityContractProvider();
	const [electoralResult, setElectoralResult] = useState<TypeInfuraStorageData>(null);
	const [isVoting, updateIsVoting] = useReducer((state: boolean) => !state, false);

	const votes = useMemo(() => {
		const TOTAL_CONFIRMED_VOTES = electoralResult?.totalConfirmedVotes || 0;
		const TOTAL_ABSTENTION_VOTES = electoralResult?.abstentionVotes.totalVotes || 0;
		const TOTAL_VOTES = chain([TOTAL_CONFIRMED_VOTES, TOTAL_ABSTENTION_VOTES]).sum().done();

		return {
			confirmed: {
				total: TOTAL_CONFIRMED_VOTES,
				totalPercentage:
					chain(TOTAL_CONFIRMED_VOTES).isZero() || chain(TOTAL_VOTES).isZero()
						? chain(0)
						: chain(TOTAL_CONFIRMED_VOTES).divide(TOTAL_VOTES).multiply(100),
			},
			abstention: {
				total: TOTAL_ABSTENTION_VOTES,
				totalPercentage:
					chain(TOTAL_ABSTENTION_VOTES).isZero() || chain(TOTAL_VOTES).isZero()
						? chain(0)
						: chain(TOTAL_ABSTENTION_VOTES).divide(TOTAL_VOTES).multiply(100),
			},
		};
	}, [electoralResult]);

	const isDisabledVoteButton = useMemo(() => {
		const WALLET_CONNECTED = useStorageDBProvider.dataCached.metamask;

		if (electoralResult && WALLET_CONNECTED) {
			const ELECTOR_ABSTENTION_VOTE = electoralResult.abstentionVotes.electors.find(wallet => wallet === WALLET_CONNECTED);
			const ELECTOR_CONFIRMED_VOTE = electoralResult.confirmedVotes.find(({ electors }) =>
				electors.find(wallet => wallet === WALLET_CONNECTED)
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
					totalPercentage:
						chain(totalVotes).isZero() || chain(totalConfirmedVotes).isZero()
							? chain(0)
							: chain(totalVotes).divide(totalConfirmedVotes).multiply(100),
				},
			})),
		[]
	);

	const cacheData = useCallback(() => {
		setElectoralResult(useStorageDBProvider.dataCached.infura);

		if (!electoralResult) {
			useSolidityContractProviderHook.actions.getElectoralResult().then(response => setElectoralResult(response));
		}
	}, [electoralResult, useStorageDBProvider, useSolidityContractProviderHook]);

	const handleOnAbstainVote = useCallback(() => {
		updateIsVoting();
		useSolidityContractProviderHook.actions.abstainVote().finally(() => updateIsVoting());
	}, [useSolidityContractProviderHook]);

	const handleOnConfirmVote = useCallback(
		(candidateID: number) => {
			updateIsVoting();
			useSolidityContractProviderHook.actions.confirmVote(candidateID).finally(() => updateIsVoting());
		},
		[useSolidityContractProviderHook]
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
