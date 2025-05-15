import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigations/root/RootNavigator';
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { StatusBar } from 'react-native';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.PRIMARY }}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),

  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: colors.WARNING }}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};


function App(): React.JSX.Element {
  const {theme} = useThemeStore();
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer>
        <RootNavigator />
        <Toast config={toastConfig}/>
      </NavigationContainer>
    </QueryClientProvider>
  );
}



export default App;
