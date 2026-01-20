import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '@/store/index';
import { RootNavigator } from '@/navigation/RootNavigator';
import { colors } from '@/theme/colors';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.background.primary}
          />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
