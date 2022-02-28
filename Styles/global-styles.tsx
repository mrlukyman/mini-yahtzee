import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  diceHeader: {
    color: '#b30d0d',
    fontSize: 40,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  score: {
    color: '#fff',
    fontSize: 30,
    backgroundColor: '#36363694',
    borderRadius: 10,

  },
  headerText: {
    color: '#b30d0d',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 10,
  },
  headerWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

  },
  dices: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#b30d0d',
    padding: 10,
    borderRadius: 5,
  },
  selection: {
    flexDirection: 'row',
  },
  footerText: {
    color: '#fff',
    fontSize: 20,
  },
  scoreText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
  },
});