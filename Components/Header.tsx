import React from 'react'
import { Text, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from '../Styles/global-styles'

export const Header = () => {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.headerText}>Mini Yahtzee</Text>
      <FontAwesome5 style={styles.diceHeader} name="dice" />
    </View>
  )
}