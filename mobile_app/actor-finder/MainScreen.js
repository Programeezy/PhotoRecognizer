import React,  {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as GoogleSignIn from 'expo-google-sign-in';


export default function MainScreen(props) {
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);

  const createFormData = (photo, body) => {
    const data = new FormData();
    const uri = Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    data.append("photo", {
      uri,
      name: "uploaded_photo",
      type: "image/jpg",        
    });    
    console.log("Data: ", data);
    return data;
  };

  handleUploadPhoto = () => {
    fetch("http://192.168.43.154:8000/api/upload_photo/", {
      method: "POST",
      body: createFormData(photo),
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload success", response);
        alert(response.Name);
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    console.log('_syncUserWithStateAsync', { user });
    setUser({ user });
  };

  initGoogleAuthAsync = async () => {
    await GoogleSignIn.initAsync({
      clientId: '847895363894-up2884dnsdqkk6v1qhhun5c1jf1rlqck.apps.googleusercontent.com', 
    });
    
    await _syncUserWithStateAsync();
  }

  handleChoosePhoto = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
      quality: 1,
      allowsEditing: true
    })

    if (!res.cancelled)
    {
      console.log(res)
      setPhoto(res)
    }
}

getPermissionAsync = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to make this work!');
  }
}

  useEffect(() => {
    getPermissionAsync();
    initGoogleAuthAsync();
  })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{justifyContent: 'space-around', bottom:50}}>
        <Button 
          title="Choose Photo" 
          onPress={this.handleChoosePhoto} />
      </View>

      {photo && (
        <React.Fragment>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300}}
          />
          <Button title="Upload" onPress={this.handleUploadPhoto} style={{top:100}} />
        </React.Fragment>
      )}
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

MainScreen.navigationOptions = {
  title: "Home",
};