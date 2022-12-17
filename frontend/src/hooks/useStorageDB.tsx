import { useCallback, useMemo } from 'react';
import { IContractGetResultConverted } from 'contract/Interfaces';

export type TypeInfuraData = IContractGetResultConverted;
export type TypeMetaMaskData = string;
export type TypeStorageKey = '@infura-provider' | '@metamask';
export type TypeInfuraStorageData = TypeInfuraData | null;
export type TypeMetaMaskStorageData = TypeMetaMaskData | null;

interface IConnectFunction {
	infuraData: TypeInfuraStorageData;
	metamaskData: TypeMetaMaskStorageData;
}

interface IUseStorageDB {
	connect: () => Promise<IConnectFunction>;
	remove: (key: TypeStorageKey) => void;
	updateInfuraStorageData: (newData: TypeInfuraData) => void;
	updateMetaMaskStorageData: (newData: TypeMetaMaskData) => void;
}

export default function useStorageDB(): IUseStorageDB {
	const INFURA_STORAGE_KEY: TypeStorageKey = '@infura-provider';
	const METAMASK_STORAGE_KEY: TypeStorageKey = '@metamask';

	const storage = useCallback((key: TypeStorageKey) => (key === '@infura-provider' ? localStorage : sessionStorage), []);

	const dispatchStorageEvent = useCallback((key: TypeStorageKey, newValue: TypeInfuraStorageData | TypeMetaMaskStorageData) => {
		const NEW_DATA = JSON.stringify(newValue);

		window.dispatchEvent(
			new StorageEvent('storage', {
				key,
				newValue: NEW_DATA,
			})
		);
	}, []);

	const infuraStorageData = useMemo(
		() =>
			new Promise<TypeInfuraStorageData>((resolve, reject) => {
				try {
					const STORAGE_DATA = storage('@infura-provider').getItem(INFURA_STORAGE_KEY);
					resolve(STORAGE_DATA ? JSON.parse(STORAGE_DATA) : null);
				} catch (error) {
					reject(error);
				}
			}),
		[storage]
	);

	const metamaskStorageData = useMemo(
		() =>
			new Promise<TypeMetaMaskStorageData>((resolve, reject) => {
				try {
					resolve(storage('@metamask').getItem(METAMASK_STORAGE_KEY));
				} catch (error) {
					reject(error);
				}
			}),
		[storage]
	);

	const connect = useCallback(
		() =>
			new Promise<IConnectFunction>((resolve, reject) => {
				Promise.all([infuraStorageData, metamaskStorageData])
					.then(response => {
						setTimeout(() => {
							resolve({
								infuraData: response[0],
								metamaskData: response[1],
							});
						}, 1000);
					})
					.catch((error: DOMException) => reject(error));
			}),
		[infuraStorageData, metamaskStorageData]
	);

	const remove = useCallback(
		(key: TypeStorageKey) => {
			storage(key).removeItem(key);
			dispatchStorageEvent(key, null);
		},
		[storage, dispatchStorageEvent]
	);

	const updateInfuraStorageData = useCallback(
		(newData: TypeInfuraData) => {
			storage(INFURA_STORAGE_KEY).setItem(INFURA_STORAGE_KEY, JSON.stringify(newData));
			dispatchStorageEvent(INFURA_STORAGE_KEY, newData);
		},
		[storage, dispatchStorageEvent]
	);

	const updateMetaMaskStorageData = useCallback(
		(newData: TypeMetaMaskData) => {
			storage(METAMASK_STORAGE_KEY).setItem(METAMASK_STORAGE_KEY, newData);
			dispatchStorageEvent(METAMASK_STORAGE_KEY, newData);
		},
		[storage, dispatchStorageEvent]
	);

	return {
		connect,
		remove,
		updateInfuraStorageData,
		updateMetaMaskStorageData,
	};
}
