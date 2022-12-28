import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useStorageDBHook, {
	TypeInfuraData,
	TypeInfuraStorageData,
	TypeMetaMaskData,
	TypeMetaMaskStorageData,
	TypeStorageKey,
} from 'hooks/useStorageDBHook';

interface IContextData {
	healthCheck: {
		isLoading: boolean;
	};
	dataCached: {
		infura: TypeInfuraStorageData;
		metamask: TypeMetaMaskStorageData;
	};
	actions: {
		addWalletInCache: (wallet: TypeMetaMaskData) => void;
		addElectoralResultInCache: (result: TypeInfuraData) => void;
		deleteWalletCached: () => void;
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

/**
 * @thiagosaud
 * @description This provider is unique because it controls the entire Caching flow in LocalStorage!
 * @interface IContextData
 */
export default function StorageDBProvider({ children }: { children: ReactNode }) {
	const { connect, update, remove } = useStorageDBHook();
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

				window.onstorage = ({ key, newValue }) => {
					if (key) {
						const STORAGE_KEY = key as TypeStorageKey;

						if (STORAGE_KEY === '@metamask') {
							updateMetaMaskData(newValue as TypeMetaMaskStorageData);
						}

						if (STORAGE_KEY === '@infura-provider') {
							const STORAGE_DATA = newValue ? (JSON.parse(newValue) as TypeInfuraStorageData) : null;
							updateInfuraData(STORAGE_DATA);
						}
					}
				};
			})
			.catch(() => {
				toast('Oops... There was a problem loading the database, please try again!', { toastId: 'loading-database', type: 'error' });
			});

		return () => {
			window.onstorage = null;
		};
	}, [connect, updateIsLoading]);

	return <CONTEXT.Provider value={value}>{children}</CONTEXT.Provider>;
}

export const useStorageDBProviderHook = () => {
	const CONTEXT_HOOK = useContext(CONTEXT);

	if (!CONTEXT_HOOK) {
		throw new Error('useStorageDBProviderHook must be used within an StorageDBProvider.');
	}

	return CONTEXT_HOOK;
};
