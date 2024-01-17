import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import CustomToast from './components/CustomToast';
import Navigator from './navigation/MyNavigationContainer';
import { store } from './redux/store';

function App(): React.JSX.Element {

  return (
    <ToastProvider
      placement='top'
      duration={3000}
      animationType={'zoom-in'}
      animationDuration={250}
      offset={50} // offset for both top and bottom toasts
      offsetTop={50}
      offsetBottom={40}
      swipeEnabled={true}
      renderToast={(e) => <CustomToast {...e} />}
    >
      <Provider store={store}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </Provider>
    </ToastProvider>

  );
}

export default App;
