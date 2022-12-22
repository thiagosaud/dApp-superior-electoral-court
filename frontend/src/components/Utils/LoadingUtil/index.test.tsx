import { render, screen } from '@testing-library/react';
import LoadingUtil from 'components/Utils/LoadingUtil';

describe('[LOADING UTIL] - Testing Component', () => {
	test('Should be have childs component!', () => {
		render(<LoadingUtil />);
		expect(screen.getByTestId(/wrapper/i)).toBeInTheDocument();
	});
});
