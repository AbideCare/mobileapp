/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component, useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  BackHandler,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/app/navigation/navigator';
import Statusbar from './src/app/components/StatusBar';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/app/redux/store/store';
import Utils from './src/app/utilities/Utils';
import {MenuProvider} from 'react-native-popup-menu';
import {roleProviderContext} from './src/app/context/roleProvider';
const backgroundStyle = {
  flex: 1,
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const UserRoleContext = useContext(roleProviderContext);
  const [userRole, setUserContextRole] = useState(UserRoleContext.userRole);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => onBackPress());
    getUserRoleFromStorage();
    console.log(' App.js UserRoleContext=>', UserRoleContext.userRole);
  }, []);
  const getUserRoleFromStorage = async () => {
    let value = await Utils.getInstance().getStoreData('role');
    if (value != undefined && value != null) {
      UserRoleContext.userRole = JSON.parse(value);
      setUserContextRole(JSON.parse(value));
      console.log(
        ' App.js UserRoleContext getUserRoleFromStorage=>',
        UserRoleContext.userRole,
      );
    }
  };
  const onBackPress = () => {
    return true;
  };

  return (
    <MenuProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <roleProviderContext.Provider value={{userRole, setUserContextRole}}>
            <SafeAreaProvider style={backgroundStyle}>
              <Statusbar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              />
              <AppNavigator></AppNavigator>
            </SafeAreaProvider>
          </roleProviderContext.Provider>
        </PersistGate>
      </Provider>
    </MenuProvider>
  );
};

export default App;
