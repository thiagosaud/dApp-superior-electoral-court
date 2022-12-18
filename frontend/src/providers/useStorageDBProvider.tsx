import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useStorageDB, { TypeInfuraData, TypeInfuraStorageData, TypeMetaMaskData, TypeMetaMaskStorageData } from 'hooks/useStorageDB';

export interface IStorageDBProviderActions {
	addWalletInCache: (wallet: TypeMetaMaskData) => void;
	addElectoralResultInCache: (result: TypeInfuraData) => void;
	deleteWalletCached: () => void;
}

interface IContextData {
	actions: IStorageDBProviderActions;
	healthCheck: {
		isLoading: boolean;
	};
	dataCached: {
		infura: TypeInfuraStorageData;
		metamask: TypeMetaMaskStorageData;
	};
}

const CONTEXT_DEFAULT_DATA: IContextData = {
	healthCheck: {
		isLoading: true,
	},
	dataCached: {
		infura: null,
		metamask: null,
	},
	actions: {
		// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, no-unused-vars
		addWalletInCache: (wallet: TypeMetaMaskData) => {},
		// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, no-unused-vars
		addElectoralResultInCache: (result: TypeInfuraData) => {},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		deleteWalletCached: () => {},
	},
};

const CONTEXT = createContext<IContextData>(CONTEXT_DEFAULT_DATA);

export default function StorageDBProvider({ children }: { children: ReactNode }) {
	const { connect, update, remove } = useStorageDB();
	const [isLoading, updateIsLoading] = useState(CONTEXT_DEFAULT_DATA.healthCheck.isLoading);
	const [infuraData, updateInfuraData] = useState<TypeInfuraStorageData>(CONTEXT_DEFAULT_DATA.dataCached.infura);
	const [metamaskData, updateMetaMaskData] = useState<TypeMetaMaskStorageData>(CONTEXT_DEFAULT_DATA.dataCached.metamask);

	const addWalletInCache = useCallback((wallet: TypeMetaMaskData) => update('@metamask', wallet), [update]);
	const addElectoralResultInCache = useCallback((result: TypeInfuraData) => update('@infura-provider', result), [update]);

	const deleteWalletCached = useCallback(() => remove('@metamask'), [remove]);

	const value: IContextData = useMemo(
		() => ({
			healthCheck: {
				isLoading,
			},
			dataCached: {
				infura: infuraData,
				metamask: metamaskData,
			},
			actions: {
				addWalletInCache,
				addElectoralResultInCache,
				deleteWalletCached,
			},
		}),
		[isLoading, infuraData, metamaskData, addWalletInCache, addElectoralResultInCache, deleteWalletCached]
	);

	useEffect(() => {
		connect()
			.then(response => {
				updateInfuraData(response.infuraData);
				updateMetaMaskData(response.metamaskData);
				updateIsLoading(false);
			})
			.catch(() => {
				toast('Oops... There was a problem loading the database, please try again!', { toastId: 'loading-database', type: 'error' });
			});
	}, [metamaskData, connect, updateIsLoading]);

	return <CONTEXT.Provider value={value}>{children}</CONTEXT.Provider>;
}

export const useStorageDBProvider = () => {
	const CONTEXT_HOOK = useContext(CONTEXT);

	if (!CONTEXT_HOOK) {
		throw new Error('useStorageDBProvider must be used within an StorageDBProvider.');
	}

	return CONTEXT_HOOK;
};
