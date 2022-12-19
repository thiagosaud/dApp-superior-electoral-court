import { useCallback } from 'react';
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
	update: (key: TypeStorageKey, newData: TypeInfuraData | TypeMetaMaskData) => void;
	remove: (key: TypeStorageKey) => void;
}

export default function useStorageDBHook(): IUseStorageDB {
	const dispatchStorageEvent = useCallback((key: TypeStorageKey, value: TypeInfuraStorageData | TypeMetaMaskStorageData) => {
		let newValue: string | null = null;

		if (key === '@metamask') {
			newValue = value as TypeMetaMaskStorageData;
		}

		if (key === '@infura-provider') {
			newValue = JSON.stringify(value as TypeInfuraStorageData);
		}

		window.dispatchEvent(
			new StorageEvent('storage', {
				key,
				newValue,
			})
		);
	}, []);

	const asyncGetData = useCallback(
		(key: TypeStorageKey) =>
			new Promise<TypeInfuraStorageData | TypeMetaMaskStorageData>((resolve, reject) => {
				try {
					const STORAGE_DATA = localStorage.getItem(key);

					if (key === '@metamask') {
						resolve(STORAGE_DATA as TypeMetaMaskStorageData);
					}

					if (key === '@infura-provider') {
						resolve(STORAGE_DATA ? (JSON.parse(STORAGE_DATA) as TypeInfuraStorageData) : null);
					}
				} catch (error) {
					reject(error);
				}
			}),
		[]
	);

	const connect = useCallback(
		() =>
			new Promise<IConnectFunction>((resolve, reject) => {
				Promise.all([asyncGetData('@infura-provider'), asyncGetData('@metamask')])
					.then(response => {
						setTimeout(() => {
							resolve({
								infuraData: response[0] as TypeInfuraStorageData,
								metamaskData: response[1] as TypeMetaMaskData,
							});
						}, 2500);
					})
					.catch((error: DOMException) => reject(error));
			}),
		[asyncGetData]
	);

	const update = useCallback(
		(key: TypeStorageKey, newData: TypeInfuraData | TypeMetaMaskData) => {
			if (key === '@metamask') {
				localStorage.setItem(key, newData as TypeMetaMaskData);
			}

			if (key === '@infura-provider') {
				localStorage.setItem(key, JSON.stringify(newData as TypeInfuraData));
			}

			dispatchStorageEvent(key, newData);
		},
		[dispatchStorageEvent]
	);

	const remove = useCallback(
		(key: TypeStorageKey) => {
			localStorage.removeItem(key);
			dispatchStorageEvent(key, null);
		},
		[dispatchStorageEvent]
	);

	return {
		connect,
		update,
		remove,
	};
}
