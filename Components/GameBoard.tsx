import React, {
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../Styles/global-styles'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { getRandom } from '../Api/DiceHelper'

const NUMBER_OF_DICE = 5
const NUMBER_OF_THROWS = 3
const HIGHEST_DIE_VALUE = 6
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
  [GameState.SCORE_ASSIGN]: 'Select your points before the next throw',
  [GameState.GAME_WON]: 'You won!',
  [GameState.GAME_LOST]: 'Game over! All points selected',
}

const initialDiceState = Array.from({ length: NUMBER_OF_DICE }, (_, i) => ({
  dieValue: i + 1,
  isHeld: false,
}))

type Score = {
  dieValue: number,
  totalScore: number,
  isAdded: boolean,
}

const initialScoreState: Score[] = Array.from({ length: HIGHEST_DIE_VALUE }, (_, i) => ({
  dieValue: i + 1,
  totalScore: 0,
  isAdded: false,
}))

export const GameBoard = () => {
  const [diceState, setDiceState] = useState(initialDiceState)
  const [scoreState, setScoreState] = useState(initialScoreState)
  const [gameState, setGameState] = useState(GameState.NOT_STARTED)
  const [numOfThrowsLeft, setNumOfThrowsLeft] = useState(NUMBER_OF_THROWS)
  const [status, setStatus] = useState(statusText[gameState])
  const totalScore = scoreState.reduce((totalScore, score) => totalScore + score.totalScore, 0)
  const totalScoreRef = useRef(0)

  const setNextRound = useCallback(() => {
    setGameState(GameState.NOT_STARTED)
    setStatus(statusText[GameState.NOT_STARTED])
    setNumOfThrowsLeft(NUMBER_OF_THROWS)
    setDiceState(initialDiceState)
  }, [])

  const restartGame = useCallback(() => {
    setGameState(GameState.NOT_STARTED)
    setStatus(statusText[GameState.NOT_STARTED])
    setNumOfThrowsLeft(NUMBER_OF_THROWS)
    setDiceState(initialDiceState)
    setScoreState(initialScoreState)
  }, [])

  const finishGame = useCallback(() => {
    const finalGameState = totalScoreRef.current >= BONUS
      ? GameState.GAME_WON
      : GameState.GAME_LOST
    setGameState(finalGameState)
    setStatus(statusText[finalGameState])
  }, [])

  const onDicePress = useCallback((dieIndex: number) => {
    if (gameState === GameState.DICE_THROW) {
      const newDiceState = [...diceState]
      newDiceState[dieIndex].isHeld = !newDiceState[dieIndex].isHeld
      setDiceState(newDiceState)
    }
  }, [diceState])

  const onScorePress = useCallback((dieIndex: number) => {
    console.log(`onScorePress: ${dieIndex} - gameState: ${gameState}`)
    if(scoreState[dieIndex].isAdded && gameState === GameState.SCORE_ASSIGN) {
      setStatus(`You've aleready selected ${dieIndex + 1}`)
    } else {
      if (gameState === GameState.SCORE_ASSIGN) {
        const newScoreState = scoreState.reduce<Score[]>((newScoreState, oldScore, index) => {
          const newScore = { ...oldScore }
          if (index === dieIndex) {
            const newDiceValue = diceState.reduce((newDiceValue, die) => {
              if (die.dieValue === dieIndex + 1) {
                newDiceValue += 1
              }
              return newDiceValue
            }, 0)
            newScore.totalScore = newDiceValue * newScore.dieValue
            newScore.isAdded = true
          }
          newScoreState.push(newScore)
          return newScoreState
        }, [])
        setScoreState(newScoreState)
        totalScoreRef.current = newScoreState.reduce((totalScore, score) => totalScore + score.totalScore, 0)
        const isBonusReached = totalScoreRef.current >= BONUS
        if (isBonusReached) {
          finishGame()
        } else {
          if (newScoreState.every(score => score.isAdded)) {
            finishGame()
          } else {
            setNextRound()
          }
        }
      }
    }
  }, [gameState, scoreState, diceState, finishGame])

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
    } else if (gameState === GameState.GAME_LOST || gameState === GameState.GAME_WON) {
      restartGame()
    }
  }, [gameState, numOfThrowsLeft])

  const renderEmptyDice = useCallback(() => (
    diceState.map((_, index) => (
      <Ionicons name='ios-square' 
        size={70} 
        color='#2c2c2c'
        key={'square-' + index}
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
  
  return (
    <View style={styles.container}>
      <View style={styles.dices}>
        {gameState === GameState.NOT_STARTED ? renderEmptyDice() : renderDiceState()}
      </View>
      <View style={styles.scoreWrapper}>
        <Text style={styles.score}>Score: {totalScore}</Text>
      </View>
      <Text style={styles.text}>Throws left: {numOfThrowsLeft}</Text>
      <Text style={styles.text}>{status}</Text>
      <Text style={styles.text}>{
        gameState === GameState.GAME_WON
          ? 'Bonus reached!'
          : `You are ${BONUS - totalScore} points away from bonus`
      }</Text>


      <TouchableOpacity
        style={styles.button}
        onPress={onThrowPress}
      >
        <Text style={[styles.text, {marginBottom: 0}]}>{gameState === GameState.GAME_LOST || gameState === GameState.GAME_WON ? 'Restart' : 'Throw dice'}</Text>
      </TouchableOpacity>
      <View style={styles.selection}>
        {scoreState.map((score, index) => (
          <TouchableOpacity
            key={'score' + index}
            onPress={() => onScorePress(index)}
          >
            <MaterialCommunityIcons
              name={`numeric-${index + 1}-circle` as keyof typeof MaterialCommunityIcons.glyphMap}
              size={60}
              color={score.isAdded ? '#2c2c2c' : '#ffffff'}
              key={'number-'}
            />
            <Text style={styles.scoreText}>{score.totalScore}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    
  )
}