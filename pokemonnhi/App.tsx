import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import React, {useEffect} from 'react';
import styles from './assets/styles';
import {store} from './src/store';
import AppNavigation from './src/navigation';
import RNBootSplash from 'react-native-bootsplash';

export default function App() {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <AppNavigation />
      </SafeAreaView>
    </Provider>
  );
}
