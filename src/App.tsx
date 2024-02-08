import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { LogBox, Platform } from 'react-native';
import { enableLatestRenderer } from 'react-native-maps';
import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationService } from 'utils/NavigationService';
import CustomToast from './components/CustomToast';
import Navigator from './navigation/MyNavigationContainer';
import { persistor, store } from './redux/store';

function App(): React.JSX.Element {
  LogBox.ignoreLogs([
    // See: https://github.com/react-navigation/react-navigation/issues/7839
    'Sending \`onAnimatedValueUpdate\` with no listeners registered.',

  ]);
  enableLatestRenderer();
  return (
    <ToastProvider
      placement='top'
      duration={1500}
      animationType={'zoom-in'}
      animationDuration={250}
      offset={50} // offset for both top and bottom toasts
      offsetTop={Platform.OS === 'ios' ? 80 : 50}
      offsetBottom={40}
      swipeEnabled={true}
      renderToast={(e) => <CustomToast {...e} />}
    >
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <NavigationContainer ref={NavigationService.setNavigationRef}>
            <Navigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ToastProvider>

  );
}

export default App;
