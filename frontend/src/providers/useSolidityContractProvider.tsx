import { createContext, ReactNode, useContext, useMemo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IContextData {}

const CONTEXT_DEFAULT_DATA: IContextData = {};

const CONTEXT = createContext<IContextData>(CONTEXT_DEFAULT_DATA);

export default function SolidityContractProvider({ children }: { children: ReactNode }) {
	const value = useMemo(() => CONTEXT_DEFAULT_DATA, []);

	return <CONTEXT.Provider value={value}>{children}</CONTEXT.Provider>;
}

export const useSolidityContractProvider = () => {
	const CONTEXT_HOOK = useContext(CONTEXT);

	if (!CONTEXT_HOOK) {
		throw new Error('useSolidityContractProvider must be used within an SolidityContractProvider.');
	}

	return CONTEXT_HOOK;
};
