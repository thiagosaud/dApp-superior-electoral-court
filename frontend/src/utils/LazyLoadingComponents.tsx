import { lazy } from 'react';

const ONE_SECOND = 1000;

export const LazyConnectWalletButton = lazy(() =>
	Promise.all([
		import(/* webpackChunkName: "ConnectWalletButton" */ 'components/Buttons/ConnectWalletButton'),
		new Promise(resolve => {
			setTimeout(resolve, ONE_SECOND);
		}),
	]).then(([moduleExports]) => moduleExports)
);

export const LazyConnectedWalletButton = lazy(() =>
	Promise.all([
		import(/* webpackChunkName: "ConnectedWalletButton" */ 'components/Buttons/ConnectedWalletButton'),
		new Promise(resolve => {
			setTimeout(resolve, ONE_SECOND);
		}),
	]).then(([moduleExports]) => moduleExports)
);

export const LazyAbstainVoteButton = lazy(() =>
	Promise.all([
		import(/* webpackChunkName: "AbstainVoteButton" */ 'components/Buttons/AbstainVoteButton'),
		new Promise(resolve => {
			setTimeout(resolve, ONE_SECOND);
		}),
	]).then(([moduleExports]) => moduleExports)
);

export const LazyCandidateList = lazy(() =>
	Promise.all([
		import(/* webpackChunkName: "CandidateList" */ 'components/Lists/CandidateList'),
		new Promise(resolve => {
			setTimeout(resolve, ONE_SECOND);
		}),
	]).then(([moduleExports]) => moduleExports)
);

export const LazyVoteProgressBarUtil = lazy(() =>
	Promise.all([
		import(/* webpackChunkName: "VoteProgressBarUtil" */ 'components/Utils/VoteProgressBarUtil'),
		new Promise(resolve => {
			setTimeout(resolve, ONE_SECOND);
		}),
	]).then(([moduleExports]) => moduleExports)
);

export const LazyVoteProgressTitleUtil = lazy(() =>
	Promise.all([
		import(/* webpackChunkName: "VoteProgressTitleUtil" */ 'components/Utils/VoteProgressTitleUtil'),
		new Promise(resolve => {
			setTimeout(resolve, ONE_SECOND);
		}),
	]).then(([moduleExports]) => moduleExports)
);
