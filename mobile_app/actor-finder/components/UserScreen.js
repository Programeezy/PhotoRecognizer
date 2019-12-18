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

export default class UserScreen extends Component {
  static navigationOptions = {
    title: 'User Profile',
  };
  
  constructor(props) {
    super(props);
    this.state = {
      is_premium: false,
    };
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleBuyPremium = this.handleBuyPremium.bind(this);

  }

  componentDidUpdate() {
      SecureStore.getItemAsync('is_premium').then((result) => {
        this.setState({is_premium: true})
      }).catch((error) => {
          console.log(error);
          this.setState({is_premium: false})
      });
  }

  handleSignOut = async () => {
    await SecureStore.deleteItemAsync('auth_token');
    await SecureStore.deleteItemAsync('is_premium');
    this.props.navigation.navigate('AuthLoading');
  }

  async handleBuyPremium() {
    const authToken = await SecureStore.getItemAsync('auth_token');
    fetch("http://192.168.43.154:8000/api/premium_activate/", {
        method: "POST",
        headers: {
            'Authorization': 'Token ' + authToken,
        },
    
        body: null,
      })
        .then(response => response.json())
        .then(response => {
          console.log("premium activated", response);
          alert('Premium activated!');
          SecureStore.setItemAsync('is_premium', 'true');
          this.setState({is_premium: true});
        })
        .catch(error => {
          console.log("Premium error", error);
          alert("Premium not activated");
        });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.container} />

        <View style={styles.wrapper}>
          {this.state.is_premium ? 
            null: <Button
            color="indigo" 
            style={styles.button} 
            title="Buy Premium" 
            onPress={this.handleBuyPremium}/> }
            <View style={{marginVertical: 25}}>  
            <Button
            color="indigo" 
            style={styles.button} 
            title="Sign Out" 
            onPress={this.handleSignOut}/>
            </View>
        </View>
        <View style={styles.container} />
      </KeyboardAvoidingView>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 15
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
    paddingVertical: 120,
    marginVertical: 15,
    alignItems: "center",
    justifyContent: "center"
},
  icon: {
    width: 20,
    height: 20,
},
});
