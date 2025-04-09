import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

function useAppState() {
    // 사용자가 앱을 사용하고 있는지 확인하기 위한 훅
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [isComeback, setIsComeback] = useState(false);

    useEffect(() => {
        // 앱 상태가 변경될 때마다 호출되는 이벤트 리스너 등록
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                // 사용자가 앱을 다시 열었을 때
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                setIsComeback(true);
            }
            // 사용자가 앱을 백그라운드로 보냈을 때
            if (appState.current.match(/active/) && nextAppState === 'background') {
                setIsComeback(false);
            }
            // 현재 앱 상태를 업데이트
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
        });

        return () => {
            // 이벤트 리스너를 제거하여 메모리 누수를 방지
            subscription.remove();
        };
    }, []);

    return { isComeback, appStateVisible };
}

export default useAppState;