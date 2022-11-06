import { memo } from 'react';
import { Button } from 'react-bootstrap';
import CandidateList from 'components/List/CandidateList';
import VotingStatisticList from 'components/List/VotingStatisticList';
import PageTemplate from 'templates/TemplatePage';

function HomePage() {
	return (
		<PageTemplate>
			<VotingStatisticList
				votes={{
					confirmed: {
						total: 124252799,
						totalPercentage: 99.99,
					},
					abstention: {
						total: 124252799,
						totalPercentage: 89.85,
					},
				}}
			/>

			<div className='mt-4 mb-3 d-flex justify-content-between align-items-center'>
				<h5 className='mb-0'>President</h5>
				<Button variant='light'>Abstain from Voting</Button>
			</div>

			<CandidateList
				data={[
					{
						// eslint-disable-next-line no-console
						onConfirmVote: number => console.log(number),
						number: 1,
						avatar: 'https://classic.exame.com/wp-content/uploads/2021/05/LULA-RICARDO-STUCKERT.jpg?quality=70&strip=info&w=1024',
						hasVoted: true,
						votesConfirmed: {
							total: 124252799,
							totalPercentage: 99.99,
						},
					},
					{
						// eslint-disable-next-line no-console
						onConfirmVote: number => console.log(number),
						number: 2,
						avatar: 'https://classic.exame.com/wp-content/uploads/2021/05/LULA-RICARDO-STUCKERT.jpg?quality=70&strip=info&w=1024',
						hasVoted: false,
						votesConfirmed: {
							total: 124252796,
							totalPercentage: 99.59,
						},
					},
					{
						// eslint-disable-next-line no-console
						onConfirmVote: number => console.log(number),
						number: 3,
						avatar: 'https://classic.exame.com/wp-content/uploads/2021/05/LULA-RICARDO-STUCKERT.jpg?quality=70&strip=info&w=1024',
						hasVoted: false,
						votesConfirmed: {
							total: 124252796,
							totalPercentage: 99.59,
						},
					},
					{
						// eslint-disable-next-line no-console
						onConfirmVote: number => console.log(number),
						number: 4,
						avatar: 'https://classic.exame.com/wp-content/uploads/2021/05/LULA-RICARDO-STUCKERT.jpg?quality=70&strip=info&w=1024',
						hasVoted: false,
						votesConfirmed: {
							total: 124252796,
							totalPercentage: 99.59,
						},
					},
					{
						// eslint-disable-next-line no-console
						onConfirmVote: number => console.log(number),
						number: 5,
						avatar: 'https://classic.exame.com/wp-content/uploads/2021/05/LULA-RICARDO-STUCKERT.jpg?quality=70&strip=info&w=1024',
						hasVoted: false,
						votesConfirmed: {
							total: 124252796,
							totalPercentage: 99.59,
						},
					},
					{
						// eslint-disable-next-line no-console
						onConfirmVote: number => console.log(number),
						number: 6,
						avatar: 'https://classic.exame.com/wp-content/uploads/2021/05/LULA-RICARDO-STUCKERT.jpg?quality=70&strip=info&w=1024',
						hasVoted: false,
						votesConfirmed: {
							total: 124252796,
							totalPercentage: 99.59,
						},
					},
				]}
			/>
		</PageTemplate>
	);
}

export default memo(HomePage);
