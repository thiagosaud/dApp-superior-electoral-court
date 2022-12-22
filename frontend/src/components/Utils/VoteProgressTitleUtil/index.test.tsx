import TestRenderer from 'react-test-renderer';
import MOCKED_DATA, { IProps } from '__test__/mocks/VoteProgressTitleUtilMock';
import VoteProgressTitleUtil from 'components/Utils/VoteProgressTitleUtil';

describe('[VOTE PROGRESS TITLE UTIL] - Testing Component Data', () => {
	const { root } = TestRenderer.create(<VoteProgressTitleUtil {...MOCKED_DATA} />);
	const PROPS = root.props as IProps;

	test('Should be have this properties values!', () => {
		expect(PROPS.percentage).toStrictEqual(MOCKED_DATA.percentage);
		expect(PROPS.total).toStrictEqual(MOCKED_DATA.total);
	});

	test('Should be have properties correct types!', () => {
		expect(typeof PROPS.percentage).toStrictEqual('number');
		expect(typeof PROPS.total).toStrictEqual('number');
	});

	test('Should be percentage value greater equal 99.99% and 89.85%!', () => {
		expect(PROPS.total).toBeLessThanOrEqual(5);
		expect(PROPS.percentage).toBeGreaterThanOrEqual(89.85);
	});
});
