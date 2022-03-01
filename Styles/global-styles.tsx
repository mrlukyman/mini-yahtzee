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
    marginBottom: 30
  },
  score: {
    color: '#fff',
    fontSize: 30,
    padding: 15,
    
  },
  scoreWrapper: {
    backgroundColor: '#2c2c2c',
    borderRadius: 5,
    marginBottom: 20
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
    height: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#b30d0d',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
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