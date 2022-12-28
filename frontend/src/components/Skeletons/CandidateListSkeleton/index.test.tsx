import { render, screen } from '@testing-library/react';
import CandidateListSkeleton from 'components/Skeletons/CandidateListSkeleton';

describe('[CANDIDATE LIST SKELETON] - Testing Component', () => {
	test('Should be have childs component!', () => {
		render(<CandidateListSkeleton />);
		expect(screen.getAllByTestId(/list-item/i).length).toEqual(6);
	});
});
