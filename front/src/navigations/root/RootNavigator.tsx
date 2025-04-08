import MainDrawerNavigator from '../drawer/ManiDrawerNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';

function RootNavigator() {
    const isLogged = false;

  return (
  <>
  {isLogged ? <MainDrawerNavigator /> : <AuthStackNavigator />}
  </>
  );
}

export default RootNavigator;
