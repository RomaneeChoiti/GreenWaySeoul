import useThemeStorage from '@/hooks/useThemeStorage';
import { CompoundOption } from '../common/CompoundOption';
import { useColorScheme } from 'react-native';

interface DarkModeOptionProps {
    isVisible: boolean;
    hideOption: () => void;
}

function DarkModeOption({isVisible, hideOption}: DarkModeOptionProps){
    const { theme, isSystem, setMode, setSystem } = useThemeStorage();
    const systemDefault = useColorScheme();


    const handleLightMode = () => {
        setMode('light');
        setSystem(false);
        hideOption();
    };

    const handleDarkMode = () => {
        setMode('dark');
        setSystem(false);
        hideOption();
    };

    const handleSystemDefault = () => {
        setMode(systemDefault ?? 'light');
        setSystem(true);
        hideOption();
    };

    return (
        <CompoundOption hideOption={hideOption} isVisible={isVisible}>
            <CompoundOption.Container>
                <CompoundOption.Button
                    onPress={handleLightMode}
                    isChecked={isSystem === false && theme === 'light'}
                >
                    라이트 모드
                </CompoundOption.Button>
                <CompoundOption.Divider />
                <CompoundOption.Button
                    onPress={handleDarkMode}
                    isChecked={isSystem === false && theme === 'dark'}
                >
                    다크 모드
                </CompoundOption.Button>
                <CompoundOption.Divider />
                <CompoundOption.Button
                    onPress={handleSystemDefault}
                    isChecked={isSystem === true}
                >
                    시스템 기본값
                </CompoundOption.Button>
            </CompoundOption.Container>
            <CompoundOption.Container>
                <CompoundOption.Button onPress={hideOption}>
                    취소
                </CompoundOption.Button>
            </CompoundOption.Container>
        </CompoundOption>
    );
}

export default DarkModeOption;
