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
    this.handleRegister = this.handleRegister.bind(this);
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

  handleRegister() {
    this.props.navigation.navigate('Register');
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
          if (response.token) {
          console.log("login success", response);
          SecureStore.setItemAsync('auth_token', response.token).then(
            this.props.navigation.navigate('App')
            )
          }
          else {
            alert('Login failed!');
          }
        })
        .catch(error => {
          console.log("Login error", error);
          alert("Login failed!");
        });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.container} />

        <View style={styles.wrapper}>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Image 
              source={usernameImg} 
              style={styles.icon}
              resizeMode="contain" />
            </View>
            <UserInput
              source={usernameImg}
              placeholder="Username"
              autoCapitalize={'none'}
              returnKeyType={'done'}
              onChangeText={this.setUsername}
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Image
              source={passwordImg}
              style={styles.icon}
              resizeMode="contain" />
            </View>
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
          </View>

        </View>
        <View style={styles.buttonContainer} >
          <View style={styles.buttonWrapper}>
                <Button
                color="indigo" 
                style={styles.button} 
                title="Sign In" 
                onPress={this.sendAuthRequest}/>
                </View>
              <View style={styles.buttonWrapper}>
                <Button
                color="indigo" 
                style={styles.button} 
                title="Register" 
                onPress={this.handleRegister}/>
            </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row"
  },
  buttonWrapper: {
    flex: 1,
    paddingHorizontal: 10
  },
  wrapper: {
    paddingHorizontal: 15
  },
  btnEye: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginLeft: 180,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
    marginBottom:5
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    backgroundColor: "transparent",
    borderRadius: 5,
    borderBottomWidth: 1
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFF'
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "indigo",
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  button: {
    backgroundColor: "indigo",
    paddingVertical: 15,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center"
},
  icon: {
    width: 20,
    height: 20,
},
});
