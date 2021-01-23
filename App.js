import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Button,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';

import CustomWheel from './components/CustomWheel';
// import WheelOfFortune from 'react-native-wheel-of-fortune';
import LottieView from 'lottie-react-native';
import { Navigation } from 'react-native-navigation';
import RNSmtpMailer from "react-native-smtp-mailer";
const Sound = require('react-native-sound')

const requireAudio = require('./test.mp3');

const s = new Sound(requireAudio, (e) => {
  if (e) {
    console.log('error', e);
    return;
  }
  // s.play(() => s.release());
  });

  

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
      isPlay: false,
    };
    this.child = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState !== this.state && prevState.winnerIndex !== this.state.winnerIndex){
      if(this.state.winnerIndex != null){
        // s.stop(() => {
        //   // Note: If you want to play a sound after stopping and rewinding it,
        //   // it is important to call play() in a callback.
        //   s.play();
        // });
        s.pause();
        Navigation.push(this.props.componentId, {
          component: {
            name: 'Result',
            options: {
              topBar: {
                visible: false
              }
            },
            passProps: {
              winner: participants[this.state.winnerIndex],
              sendEmail: this.sendEmail,
            }
          }
        });
        this.setState({
          msu: '',
          msa: ''
        })
      }
    }
  }

  buttonPress = () => {
    this.setState({
      started: true,
    });
    this.child._onPress();
  };

  onFinish = () => {
    this.setState({
      isPlay: false
    });
    
  }

  sendEmail = () => {
    RNSmtpMailer.sendMail({
      mailhost: "smtp.gmail.com",
      port: "465",
      ssl: true, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
      username: "silinh66@gmail.com",
      password: "tmkITC98",
      from: "silinh66@gmail.com",
      recipients: "nguyenlinh5266@gmail.com",
      subject: "subject",
      htmlBody: `<h1>App Infomation</h1><p>Person1: ${this.state.msu} Person2: ${this.state.msa} Percent: ${participants[this.state.winnerIndex]}</p>`,
      // attachmentPaths: ["pathToFile1.png","pathToFile2.txt","pathToFile3.csv"],
      // attachmentNames: ["image.jpg", "firstFile.txt", "secondFile.csv"],//only used in android, these are renames of original files. in ios filenames will be same as specified in path. In ios-only application, leave it empty: attachmentNames:[] 
      // attachmentTypes: ["img", "txt", "csv"]//needed for android, in ios-only application, leave it empty: attachmentTypes:[]
    })
      .then(success => console.log(success))
      .catch(err => alert(err));
  };

  render() {
    console.log('height', Dimensions.get('screen').height);
    // console.log('You win', participants[this.state.winnerIndex]);
    console.log('isPlay', this.state.isPlay);
    console.log('winnerIndex', this.state.winnerIndex);
    console.log('isStarted', this.state.started);
    console.log('------------------------------------');
    const wheelOptions = {
      rewards: participants,
      knobSize: 20,
      borderWidth: 0,
      borderColor: 'pink',
      innerRadius: 30,
      duration: 6000,
      backgroundColor: 'transparent',
      textAngle: 'horizontal',
      knobSource: require('./knob.png'),
      onRef: (ref) => (this.child = ref),
      isPlay: this.state.isPlay,
      onFinish: this.onFinish,
    };
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <TextInput
          style={{
            borderWidth: 3,
            margin: 25,
            marginBottom: '3.125%',
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
          style={{width: '100%', height: '15.625%'}}
          onPress={() => {
            s.play((success) => {
              if (!success) {
                console.log('Sound did not play')
              }
            })
            if(!this.state.started && this.state.winnerIndex === null){
              this.child._onPress();
              console.log('Cat pushed');
              console.log('person1', this.state.msu);
              console.log('person2', this.state.msa);
              this.setState({
                // msu: '',
                // msa: '',
                isPlay: true,
              });
            } 
            if(this.state.winnerIndex !== null){
              this.child._tryAgain();
              this.sendEmail();
            }
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
            marginBottom: 0,
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
        <CustomWheel
          options={wheelOptions}
          getWinner={(value, index) => {
            this.setState({winnerValue: value, winnerIndex: index});
          }}
        />
        {/* {!this.state.started && (
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
        )} */}
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
