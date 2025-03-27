import AuthStackNavigator from "../stack/AuthStackNavigator";
import MainDrawerNavigator from "../drawer/ManiDrawerNavigator";

function RootNavigator() {
    const isLogged = false;

  return (
 <>
 {isLogged ? <MainDrawerNavigator /> : <AuthStackNavigator />}
 </>
  );
}

export default RootNavigator;