import { useThemeStore } from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { getEncryptStorage, setEncryptStorage } from '@/utils';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

function useThemeStorage() {
    const systemTheme = useColorScheme();
    const { theme, isSystem, setTheme,setSystemTheme } = useThemeStore();
    /*
    TODO: EncryptStorage가 아닌 AsyncStorage로 변경하기
    */
   const setMode = async (mode: ThemeMode) => {
        // await setAsyncStorage('themeMode', mode);
        await setEncryptStorage('themeMode', mode);
        setTheme(mode);
    };

    const setSystem = async (flag: boolean) => {
        // await setAsyncStorage('themeSystem', flag);
        await setEncryptStorage('themeSystem', flag);
        setSystemTheme(flag);
    };

    useEffect(() => {
        (async () => {
            // await getAsyncStorage('themeMode')) ?? 'light';
            const mode = (await getEncryptStorage('themeMode')) ?? 'light';
            // await getAsyncStorage('themeSystem')) ?? 'false';
            const systemMode = (await getEncryptStorage('themeSystem')) ?? 'false';
            const newMode = systemMode ? systemTheme : mode;
            setTheme(newMode);
            setSystemTheme(systemMode);
        });
    },[setTheme, setSystemTheme, systemTheme]);

    return { theme, isSystem, setMode, setSystem };
}

export default useThemeStorage;
