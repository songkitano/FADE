import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import WheelOfFortune from 'react-native-wheel-of-fortune';
import LottieView from 'lottie-react-native';

const participants = [
  '%10',
  '%20',
  '%30',
  '%40',
  '%50',
  '%60',
  '%70',
  '%90',
  '%0',
];
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winnerValue: null,
      winnerIndex: null,
      started: false,
      msu: '',
      msa: '',
    };
    this.child = null;
  }

  buttonPress = () => {
    this.setState({
      started: true,
    });
    this.child._onPress();
  };

  render() {
    const wheelOptions = {
      rewards: participants,
      knobSize: 30,
      borderWidth: 0,
      borderColor: 'pink',
      innerRadius: 30,
      duration: 6000,
      backgroundColor: 'transparent',
      textAngle: 'horizontal',
      knobSource: require('./knob.png'),
      onRef: (ref) => (this.child = ref),
    };
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <TextInput
          style={{
            borderWidth: 3,
            margin: 25,
            marginBottom: 20,
            borderRadius: 30,
            textAlign: 'center',
            width: '90%',
          }}
          placeholder="person1"
          value={this.state.msu}
          onChangeText={(msu) => {
            // console.log(msu);
            this.setState({
              msu,
            });
          }}></TextInput>
        <Text>PUSH THE CAT !!!</Text>

        <TouchableOpacity
          style={{width: '100%', height: 100}}
          onPress={() => {
            console.log('Cat pushed');
            console.log('person1', this.state.msu);
            console.log('person2', this.state.msa);
            this.setState({
              msu: '',
              msa: '',
            });
          }}>
          <LottieView
            source={require('./pcat.json')}
            autoPlay
            loop></LottieView>
        </TouchableOpacity>

        <TextInput
          style={{
            borderWidth: 3,
            margin: 25,
            marginBottom: 10,
            borderRadius: 30,
            textAlign: 'center',
            width: '90%',
          }}
          placeholder="person2"
          value={this.state.msa}
          onChangeText={(msa) => {
            // console.log(msa);
            this.setState({
              msa,
            });
          }}></TextInput>
        <WheelOfFortune
          options={wheelOptions}
          getWinner={(value, index) => {
            this.setState({winnerValue: value, winnerIndex: index});
          }}
        />
        {!this.state.started && (
          <View style={styles.startButtonView}>
            <TouchableOpacity
              onPress={() => this.buttonPress()}
              style={styles.startButton}>
              <Text style={styles.startButtonText}>Spin to win!</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.winnerIndex != null && (
          <View style={styles.winnerView}>
            <Text style={styles.winnerText}>
              You win {participants[this.state.winnerIndex]}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({winnerIndex: null});
                this.child._tryAgain();
              }}
              style={styles.tryAgainButton}>
              <Text style={styles.tryAgainText}>TRY AGAIN</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  startButtonView: {
    position: 'absolute',
  },
  startButton: {
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: 280,
    padding: 5,
  },
  startButtonText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  winnerView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryAgainButton: {
    padding: 10,
  },
  winnerText: {
    fontSize: 30,
  },
  tryAgainButton: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tryAgainText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
