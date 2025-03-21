import React from 'react';
import { SafeAreaView } from 'react-native';
import BattlefieldApp from './src/games/battlefield/BattlefieldApp';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BattlefieldApp />
    </SafeAreaView>
  );
}