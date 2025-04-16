import MainDrawerNavigator from '../drawer/MainDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import useLoginStore from '../../store/useLoginStore';

function RootNavigator() {
  const isLogged = useLoginStore(state => state.isLoggedIn);

  return (
    <>
      {isLogged ? <MainDrawerNavigator /> : <AuthStackNavigator />}
    </>
  );
}

export default RootNavigator;
