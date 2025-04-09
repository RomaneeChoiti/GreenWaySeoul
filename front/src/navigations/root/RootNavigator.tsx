import MainDrawerNavigator from '../drawer/ManiDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';

function RootNavigator() {
    // TODO: Login 상태일 때를 기준으로
    const isLogged = true;

  return (
  <>
  {isLogged ? <MainDrawerNavigator /> : <AuthStackNavigator />}
  </>
  );
}

export default RootNavigator;
