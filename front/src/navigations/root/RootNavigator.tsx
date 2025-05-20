import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import useAuth from '@/hooks/queries/useAuth';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { numbers } from '@/constants';



function RootNavigator() {
  const { isLogin, isLoginLoading } = useAuth();

  useEffect(() => {
    if(!isLoginLoading) {
      setTimeout(()=>{
        SplashScreen.hide();
      }, numbers.SPLASH_HIDE_DELAY);
    }
  }, [isLoginLoading]);

  return (
    <RetryErrorBoundary>
      {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </RetryErrorBoundary>
  );
}

export default RootNavigator;
