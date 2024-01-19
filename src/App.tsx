import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LogBox } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import { NavigationService } from 'utils/NavigationService';
import CustomToast from './components/CustomToast';
import Navigator from './navigation/MyNavigationContainer';
import { store } from './redux/store';

function App(): React.JSX.Element {
  LogBox.ignoreLogs([
    // See: https://github.com/react-navigation/react-navigation/issues/7839
    'Sending \`onAnimatedValueUpdate\` with no listeners registered.',

  ]);
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
        <NavigationContainer ref={NavigationService.setNavigationRef}>
          <Navigator />
        </NavigationContainer>
      </Provider>
    </ToastProvider>

  );
}

export default App;
