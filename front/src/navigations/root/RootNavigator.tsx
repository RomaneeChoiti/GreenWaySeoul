import { useEffect } from 'react';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import useAuth from '@/hooks/queries/useAuth';
import useLoginStore from '../../store/useLoginStore';

function RootNavigator() {
  const { isLoggedIn, setLoginStatus } = useLoginStore();
  const { isLogin } = useAuth();

  useEffect(() => {
    setLoginStatus(isLogin);
  }, [isLogin, setLoginStatus]);

  return (
    <>
      {isLoggedIn ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </>
  );
}

export default RootNavigator;
