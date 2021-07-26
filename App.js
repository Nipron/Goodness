import React from 'react';
import AppLoading from 'expo-app-loading';
import Navigator from './routes/homeStack5'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './redux/store';

import {
  useFonts,
  Assistant_200ExtraLight,
  Assistant_300Light,
  Assistant_400Regular,
  Assistant_500Medium,
  Assistant_600SemiBold,
  Assistant_700Bold,
  Assistant_800ExtraBold,
} from '@expo-google-fonts/assistant';

const store = createStore(reducers)

export default function App() {

  let [fontsLoaded, error] = useFonts({
    Assistant_200ExtraLight,
    Assistant_300Light,
    Assistant_400Regular,
    Assistant_500Medium,
    Assistant_600SemiBold,
    Assistant_700Bold,
    Assistant_800ExtraBold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

