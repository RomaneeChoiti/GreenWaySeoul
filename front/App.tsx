import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigations/root/RootNavigator';
import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import { colors } from '@/constants';
import { useThemeStore } from '@/store/useThemeStore';
import { StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';

const toastStyles = StyleSheet.create({
  text1: {
    fontSize: 15,
  },
  text2: {
    fontSize: 12,
  },
  successBorder: {
    borderLeftColor: colors.PRIMARY,
  },
  errorBorder: {
    borderLeftColor: colors.WARNING,
  },
});

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={toastStyles.successBorder}
      text1Style={toastStyles.text1}
      text2Style={toastStyles.text2}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={toastStyles.errorBorder}
      text1Style={toastStyles.text1}
      text2Style={toastStyles.text2}
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
