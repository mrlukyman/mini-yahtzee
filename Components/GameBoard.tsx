import React, { useEffect, useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../Styles/global-styles'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { getRandom } from '../Api/DiceHelper'

let board: (keyof typeof MaterialCommunityIcons.glyphMap)[] = []
const NUMBER_OF_DICES = 5
const NUMBER_OF_THROWS = 3
const BONUS = 63

export const GameBoard = () => {
  const [numOfThrowsLeft, setNumOfThrowsLeft] = useState(NUMBER_OF_THROWS)
  const [sumOfDices, setSumOfDices] = useState<number>(0)
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState('Throw dices')
  const [isClicked, setClicked] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  const row = []
  const selection = []
  
  const handlePress = () => {
    setClicked(true)
    isSelected ? setIsSelected(false) : setIsSelected(true)
    setStatus('Select dice')
    console.log('clicked')
  }
  for(let i = 0; i < 5; i++) {
    row.push(
      <MaterialCommunityIcons
      name={board[i]}
      key={'dice' + i}
      size={70}
      color={'#ffffff'}
      />
      
      )
      selection.push(
        <Pressable
        onPress={handlePress}
        >
        <MaterialCommunityIcons 
        name={"numeric-" + (i+1) + "-circle" as keyof typeof MaterialCommunityIcons.glyphMap} 
        size={60} 
        color={isSelected ? "#2c2c2c" : "#ffffff"} 
        key={'number-' }
        />
      </Pressable>
    )
  }
  
  
  const empty = []
  for(let i = 0; i < 5; i++) {
    empty.push(
      <Ionicons name="ios-square" 
      size={70} 
      color='#2c2c2c'
      key={"square-" + i}
      />
    )
  }
  const initialize = () => {

  }

  useEffect(() => {
    checkWinner()
  }, [numOfThrowsLeft])

  const throwDices = () => {
    let sum = 0
    for(let i = 0; i < NUMBER_OF_DICES; i++) {
      let randomNumber = Math.floor(Math.random() * 6) + 1
      board[i] = 'dice-' + randomNumber as keyof typeof MaterialCommunityIcons.glyphMap
      sum += randomNumber
    }
    setNumOfThrowsLeft(numOfThrowsLeft - 1)
    setSumOfDices(sum)
    setClicked(true)
    
    if(numOfThrowsLeft === 0) {
      setStatus('Select your points')
      resetGame()
    } else if(numOfThrowsLeft <= NUMBER_OF_THROWS){
      setStatus('Select and throw again')
    }
  }

  const checkWinner = () => {
    if(numOfThrowsLeft === 0 && sumOfDices >= BONUS) {
      setStatus('You win!')
    }
  }

  const resetGame = () => {
    setNumOfThrowsLeft(NUMBER_OF_THROWS)
    setStatus('Throw Dices')
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.dices}>
        {isClicked ? row : empty}
      </View>
      <Text style={styles.score}>Score: {sumOfDices}</Text>
      <Text style={styles.text}>{status}</Text>
      <Text style={styles.text}>Thorws left: {numOfThrowsLeft}</Text>
      <Text style={styles.text}>You are {BONUS - sumOfDices} away from bonus</Text>


      <TouchableOpacity
        style={styles.button}
        onPress={() => throwDices()}
        >
          <Text style={styles.text}>Throw dices</Text>
        </TouchableOpacity>
        <View style={styles.selection}>{selection}</View>
    </View>
    
  )
}