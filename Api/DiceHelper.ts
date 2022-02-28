import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const getRandom = () => {
  return Math.floor(Math.random() * 6) + 1
}
