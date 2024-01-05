import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Navigator from './navigation/MyNavigationContainer';



function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

export default App;
