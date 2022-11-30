import { fireEvent, render, screen } from '@testing-library/react';
import HomePage from '.';

describe('[HOME PAGE] - Testing Component', () => {
	test('Should be have childs component!', () => {
		render(<HomePage />);

		const pageTemplate = screen.getByTestId('custom-container-component');
		const votingStaticList = screen.getByTestId('voting-static-list-component');
		const candidateList = screen.getByTestId('candidate-list-component');
		const sectionTitle = screen.getByText('President');
		const abstainVoteButton = screen.getByText('Abstain from Voting');

		expect(pageTemplate).toBeInTheDocument();
		expect(abstainVoteButton).toBeInTheDocument();
		expect(abstainVoteButton).toBeInTheDocument();
		expect(sectionTitle).toBeInTheDocument();
		expect(votingStaticList).toBeInTheDocument();
		expect(candidateList).toBeInTheDocument();
	});
});

describe('[HOME PAGE] - Abstain Vote Button Component', () => {
	test('Should be work on Click!', () => {
		render(<HomePage />);
		expect(fireEvent.click(screen.getByText('Abstain from Voting'))).toBe(true);
	});
});
