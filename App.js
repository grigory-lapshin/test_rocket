import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import CardSelector from './src/components/CardSelector';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <CardSelector />
      </SafeAreaView>
    </>
  );
};

export default App;
