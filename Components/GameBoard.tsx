import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../Styles/global-styles'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { getRandom } from '../Api/DiceHelper'

// let board: (keyof typeof MaterialCommunityIcons.glyphMap)[] = []
const NUMBER_OF_DICE = 5
const NUMBER_OF_THROWS = 3
const BONUS = 63

enum GameState {
  NOT_STARTED,
  DICE_THROW,
  SCORE_ASSIGN,
  GAME_WON,
  GAME_LOST,
}

const statusText = {
  [GameState.NOT_STARTED]: 'Throw dice',
  [GameState.DICE_THROW]: 'Select and throw dice again',
  [GameState.SCORE_ASSIGN]: 'Select your points',
  [GameState.GAME_WON]: 'You won!',
  [GameState.GAME_LOST]: 'You lost!',
}

const initialDiceState = Array.from({ length: NUMBER_OF_DICE }, (_, i) => ({
  dieValue: i + 1,
  isHeld: false,
}))

const initialScoreState = [
  { dieValue: 1, totalScore: 0, isAdded: false },
  { dieValue: 2, totalScore: 0, isAdded: false },
  { dieValue: 3, totalScore: 0, isAdded: false },
  { dieValue: 4, totalScore: 0, isAdded: false },
  { dieValue: 5, totalScore: 0, isAdded: false },
  { dieValue: 6, totalScore: 0, isAdded: false },
]


export const GameBoard = () => {
  const [diceState, setDiceState] = useState(initialDiceState)
  const [scoreState, setScoreState] = useState(initialScoreState)
  const [gameState, setGameState] = useState(GameState.NOT_STARTED)
  const [numOfThrowsLeft, setNumOfThrowsLeft] = useState(NUMBER_OF_THROWS)
  const [status, setStatus] = useState(statusText[gameState])
  const totalScore = scoreState.reduce((totalScore, score) => totalScore + score.totalScore, 0)
  // const [isClicked, setClicked] = useState(false)
  // const [isSelected, setIsSelected] = useState(false)

  // const row = []
  // const selection = []

  const onDicePress = useCallback((dieIndex: number) => {
    if (gameState === GameState.DICE_THROW) {
      const newDiceState = [...diceState]
      newDiceState[dieIndex].isHeld = !newDiceState[dieIndex].isHeld
      setDiceState(newDiceState)
    }
  }, [diceState])

  const rerollDice = useCallback(() => {
    const newDiceState = diceState.map(({dieValue, isHeld}) => ({
      dieValue: isHeld ? dieValue : getRandom(),
      isHeld,
    }))
    setDiceState(newDiceState)
  }, [diceState])

  const onThrowPress = useCallback(() => {
    if (gameState === GameState.NOT_STARTED) {
      setGameState(GameState.DICE_THROW)
      setNumOfThrowsLeft(numOfThrowsLeft - 1)
      setStatus(statusText[GameState.DICE_THROW])
      rerollDice()
    } else if (gameState === GameState.DICE_THROW) {
      if (numOfThrowsLeft > 1) {
        rerollDice()
        setNumOfThrowsLeft(numOfThrowsLeft - 1)
      } else {
        rerollDice()
        setNumOfThrowsLeft(numOfThrowsLeft - 1)
        setGameState(GameState.SCORE_ASSIGN)
        setStatus(statusText[GameState.SCORE_ASSIGN])
      }
    }
  }, [gameState, numOfThrowsLeft])

  const renderEmptyDice = useCallback(() => (
    diceState.map((_, index) => (
      <Ionicons name="ios-square" 
        size={70} 
        color='#2c2c2c'
        key={"square-" + index}
      />
    ))
  ), [])
  const renderDiceState = useCallback(() => (
    diceState.map((dice, index) => (
      <TouchableOpacity
        key={'dice' + index}
        onPress={() => onDicePress(index)}
      >
        <MaterialCommunityIcons
          name={`dice-${dice.dieValue}` as keyof typeof MaterialCommunityIcons.glyphMap}
          size={70}
          color={dice.isHeld ? '#383838' : '#FFF'}
        />
      </TouchableOpacity>
    ))
  ), [diceState, onDicePress])

  // const handlePress = useCallback(() => {
  //   setClicked(true)
  //   setIsSelected(!isSelected)
  //   setStatus('Select dice')
  //   console.log('clicked')
  // }, [isSelected])
  // for(let i = 0; i < 5; i++) {
  //   row.push(
  //     <MaterialCommunityIcons
  //     name={board[i]}
  //     key={'dice' + i}
  //     size={70}
  //     color={'#ffffff'}
  //     />
  //   )
  //     selection.push(
  //       <Pressable
  //       onPress={handlePress}
  //       >
  //       <MaterialCommunityIcons 
  //       name={"numeric-" + (i+1) + "-circle" as keyof typeof MaterialCommunityIcons.glyphMap} 
  //       size={60} 
  //       color={isSelected ? "#2c2c2c" : "#ffffff"} 
  //       key={'number-' }
  //       />
  //     </Pressable>
  //   )
  // }
  
  
  // const empty = []
  // for(let i = 0; i < 5; i++) {
  //   empty.push(
  //     <Ionicons name="ios-square" 
  //     size={70} 
  //     color='#2c2c2c'
  //     key={"square-" + i}
  //     />
  //   )
  // }
  // const initialize = () => {

  // }

  // useEffect(() => {
  //   checkWinner()
  // }, [numOfThrowsLeft])

  // const throwDices = () => {
  //   let sum = 0
  //   for(let i = 0; i < NUMBER_OF_DICE; i++) {
  //     let randomNumber = Math.floor(Math.random() * 6) + 1
  //     board[i] = 'dice-' + randomNumber as keyof typeof MaterialCommunityIcons.glyphMap
  //     sum += randomNumber
  //   }
  //   setNumOfThrowsLeft(numOfThrowsLeft - 1)
  //   setSumOfDices(sum)
  //   setClicked(true)
    
  //   if(numOfThrowsLeft === 0) {
  //     setStatus('Select your points')
  //     resetGame()
  //   } else if(numOfThrowsLeft <= NUMBER_OF_THROWS){
  //     setStatus('Select and throw again')
  //   }
  // }

  // const checkWinner = () => {
  //   if(numOfThrowsLeft === 0 && sumOfDices >= BONUS) {
  //     setStatus('You win!')
  //   }
  // }

  const resetGame = () => {
    setNumOfThrowsLeft(NUMBER_OF_THROWS)
    setStatus('Throw Dices')
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.dices}>
        {gameState === GameState.NOT_STARTED ? renderEmptyDice() : renderDiceState()}
      </View>
      <Text style={styles.score}>Score: {totalScore}</Text>
      <Text style={styles.text}>{status}</Text>
      <Text style={styles.text}>Throws left: {numOfThrowsLeft}</Text>
      <Text style={styles.text}>You are {BONUS - totalScore} points away from bonus</Text>


      <TouchableOpacity
        style={styles.button}
        onPress={onThrowPress}
      >
        <Text style={styles.text}>Throw dices</Text>
      </TouchableOpacity>
      <View style={styles.selection}>
        {scoreState.map((score, index) => (
          <TouchableOpacity
            key={'score' + index}
          >
            <MaterialCommunityIcons
              name={`numeric-${index + 1}-circle` as keyof typeof MaterialCommunityIcons.glyphMap}
              size={60}
              color={score.isAdded ? "#2c2c2c" : "#ffffff"}
              key={'number-'}
            />
            <Text style={styles.scoreText}>{score.totalScore}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    
  )
}