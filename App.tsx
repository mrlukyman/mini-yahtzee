import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { styles } from './Styles/global-styles';
import { Header, Footer, GameBoard } from './Components/index';
import { getRandom } from './Api/DiceHelper';


export default function App() {
  const [sumOfDices, setSumOfDices] = React.useState(0)
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <GameBoard />
      <Footer />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
