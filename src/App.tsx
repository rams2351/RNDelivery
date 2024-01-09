import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';
import Navigator from './navigation/MyNavigationContainer';
import { store } from './redux/store';


function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
