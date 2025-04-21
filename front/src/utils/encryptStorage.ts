/*
    encryptStorage는 localStorage와 비슷하게 사용된다.
    encryptStorage는 async await문법을 사용해야한다.
*/

import EncryptedStorage from 'react-native-encrypted-storage';

const setEncryptStorage = async <T>(key: string, data:T) => {
    await EncryptedStorage.setItem(key, JSON.stringify(data));
};

const getEncryptStorage = async (key: string) => {
    const storedData = await EncryptedStorage.getItem(key);

    return storedData ? JSON.parse(storedData) : null;
};

const removeEncryptStorage = async (key: string) => {
    const data = await getEncryptStorage(key);

    if(data){
        await EncryptedStorage.removeItem(key);
    }
};

export { setEncryptStorage, getEncryptStorage, removeEncryptStorage };
