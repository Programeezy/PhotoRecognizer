import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import * as SecureStore from 'expo-secure-store';

import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';

import UserInput from './UserInput';

import usernameImg from '../assets/username.png';
import passwordImg from '../assets/password.png';
import eyeImg from '../assets/eye_black.png';

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Please sign in',
  };
  
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      username: null,
      password: null,
    };
    this.showPass = this.showPass.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.sendAuthRequest = this.sendAuthRequest.bind(this);
  }
  
  setUsername(username) {
    this.setState({username: username})
  }

  setPassword(password) {
    this.setState({password: password})
  }

  showPass() {
    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  sendAuthRequest() {
    fetch("http://192.168.43.154:8000/auth/login/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
    
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
        }),
      })
        .then(response => response.json())
        .then(response => {
          console.log("login success", response);
          SecureStore.setItemAsync('auth_token', response.token).then(
            this.props.navigation.navigate('App')
            )
        })
        .catch(error => {
          console.log("Login error", error);
          alert("Login failed!");
        });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInput
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          onChangeText={this.setUsername}
          autoCorrect={false}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={this.state.showPass}
          onChangeText={this.setPassword}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>
        <Button title="Sign In" onPress={this.sendAuthRequest}/>
      </KeyboardAvoidingView>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 55,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});
