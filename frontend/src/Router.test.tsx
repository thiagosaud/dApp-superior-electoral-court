import TestRenderer from 'react-test-renderer';
import { BrowserRouter, Routes, Navigate } from 'react-router-dom';
import AppbarGlobal from 'components/Global/AppbarGlobal';
import FooterbarGlobal from 'components/Global/FooterbarGlobal';
import HomePage from 'pages/HomePage';
import Router from 'Router';

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('[ROUTER] - Testing Component', () => {
	test('Should be have child components!', () => {
		const renderResult = TestRenderer.create(<Router />);
		const renderResultRendered: any = renderResult.toTree()?.rendered;

		expect(renderResultRendered.type).toStrictEqual(BrowserRouter);
		expect(renderResultRendered.props?.children[0]?.type).toStrictEqual(AppbarGlobal);
		expect(renderResultRendered.props?.children[1]?.type).toStrictEqual(Routes);
		expect(renderResultRendered.props?.children[2]?.type).toStrictEqual(FooterbarGlobal);
	});

	test('Should be root route working!', () => {
		const renderResult = TestRenderer.create(<Router />);
		const renderResultRendered: any = renderResult.toTree()?.rendered;
		const routerProps = renderResultRendered?.props.children[1].props.children[0].props;

		expect(routerProps?.path).toStrictEqual('/');
		expect(routerProps?.element?.type).toStrictEqual(HomePage);
		expect(routerProps?.index).toBe(true);
	});

	test('Should be 404 route working!', () => {
		const renderResult = TestRenderer.create(<Router />);
		const renderResultRendered: any = renderResult.toTree()?.rendered;
		const routerProps = renderResultRendered?.props?.children[1]?.props?.children[1]?.props;

		expect(routerProps?.path).toStrictEqual('*');
		expect(routerProps?.element?.type).toStrictEqual(Navigate);
	});
});
