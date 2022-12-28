import { render, screen } from '@testing-library/react';
import GenericSkeleton from 'components/Skeletons/GenericSkeleton';

describe('[GENERIC SKELETON] - Testing Component', () => {
	test('Should be have childs component!', () => {
		render(<GenericSkeleton height='100px' width='100px' isRounded />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});
});
