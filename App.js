import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import CardSelector from './src/components/CardSelector';
import Card from './src/components/Card';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <CardSelector>
          <Card />
          <Card />
        </CardSelector>
      </SafeAreaView>
    </>
  );
};

export default App;
