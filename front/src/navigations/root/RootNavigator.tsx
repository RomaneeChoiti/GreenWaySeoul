import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import useAuth from '@/hooks/queries/useAuth';
// import useLoginStore from '../../store/useLoginStore';
// import { useEffect } from 'react';

function RootNavigator() {
  // const { isLoggedIn, setLoginStatus } = useLoginStore();
  const { isLogin } = useAuth();

  // useEffect(() => {
  //   setLoginStatus(isLogin);
  // }, [isLogin, setLoginStatus]);

  return (
    <>
      {isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </>
  );
}

export default RootNavigator;
