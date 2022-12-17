import { memo, useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { Button } from 'react-bootstrap';
import { chain } from 'mathjs';
import PageTemplate from 'templates/TemplatePage';
import VotingStatisticList from 'components/Lists/VotingStatisticList';
import CandidateList from 'components/Lists/CandidateList';
import { useSolidityContractProvider } from 'providers/useSolidityContractProvider';
import { TypeInfuraStorageData, TypeInfuraData } from 'hooks/useStorageDB';
import CandidateListSkeleton from 'components/Skeletons/CandidateListSkeleton';

function HomePage() {
	const { actions, states } = useSolidityContractProvider();
	const [isLoadingElectoralResult, updateIsLoadingElectoralResult] = useReducer(state => !state, true);
	const [electoralResult, setElectoralResult] = useState<TypeInfuraStorageData>(null);

	const votes = useMemo(() => {
		const TOTAL_CONFIRMED_VOTES = electoralResult?.totalConfirmedVotes || 0;
		const TOTAL_ABSTENTION_VOTES = electoralResult?.abstentionVotes.vote.total || 0;
		const TOTAL_VOTES = chain([TOTAL_CONFIRMED_VOTES, TOTAL_ABSTENTION_VOTES]).sum().done();

		return {
			confirmed: {
				total: TOTAL_CONFIRMED_VOTES,
				totalPercentage: chain(TOTAL_CONFIRMED_VOTES).divide(TOTAL_VOTES).multiply(100),
			},
			abstention: {
				total: TOTAL_ABSTENTION_VOTES,
				totalPercentage: chain(TOTAL_ABSTENTION_VOTES).divide(TOTAL_VOTES).multiply(100),
			},
		};
	}, [electoralResult]);

	const getCandidateList = useCallback(
		({ confirmedVotes, totalConfirmedVotes }: TypeInfuraData) =>
			confirmedVotes.map(({ candidate, vote }) => ({
				// eslint-disable-next-line no-console
				onConfirmVote: (number: number) => console.log(number),
				number: candidate,
				hasVoted: false,
				votesConfirmed: {
					total: vote.total,
					totalPercentage: chain(vote.total).divide(totalConfirmedVotes).multiply(100),
				},
			})),
		[]
	);

	const cacheData = useCallback(() => {
		if (!states.isLoadingDB && states.infuraDB) {
			setElectoralResult(states.infuraDB);
		}

		if (!states.isLoadingDB && !states.infuraDB) {
			actions.getElectoralResult().then(data => setElectoralResult(data));
		}

		updateIsLoadingElectoralResult();
	}, [actions, states]);

	useEffect(() => cacheData(), [cacheData]);

	return (
		<PageTemplate>
			<VotingStatisticList isLoading={isLoadingElectoralResult} votes={votes} />

			<div className='mt-4 mb-3 d-flex justify-content-between align-items-center'>
				<h5 className='mb-0'>President</h5>
				<Button variant='light'>Abstain from Voting</Button>
			</div>

			{(states.isLoadingDB || isLoadingElectoralResult) && !electoralResult && <CandidateListSkeleton />}

			{!states.isLoadingDB && !isLoadingElectoralResult && electoralResult && <CandidateList data={getCandidateList(electoralResult)} />}
		</PageTemplate>
	);
}

export default memo(HomePage);
