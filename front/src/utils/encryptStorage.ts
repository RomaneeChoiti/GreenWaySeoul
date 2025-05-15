/*
    encryptStorage는 localStorage와 비슷하게 사용된다.
    encryptStorage는 async await문법을 사용해야한다.
    하지만 localStorage와 다르게 암호화된 데이터를 저장한다.
    localStorage는 보안에 취약하기 때문에 민감한 정보를 저장할 때는 encryptStorage를 사용해야 한다.
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
