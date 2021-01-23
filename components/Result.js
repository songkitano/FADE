import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.sendEmail();
  }

  componentDidUpdate(prevProps, prevState) {
      if(prevProps !== this.props) {
          this.props.sendEmail();
      }
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
        <Text style={{fontSize: 40, fontWeight: 'bold'}}>Result</Text>
        <Text style={{fontSize: 40, fontWeight: 'bold'}}>You win {this.props.winner}</Text>
      </View>
    );
  }
}
