import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../Styles/global-styles'

export const Footer = () => {
  return (
    <View>
      <Text style={styles.footerText}>Made by Lukas Haring</Text>
    </View>
  )
}