import React,  {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default function App() {
  const [photo, setPhoto] = useState(null);

  handleChoosePhoto = async () => {
    const options = {
      noData: true,
    }
    let res = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
      quality: 1,
      allowsEditing: true
    })

    if (!res.cancelled)
    {
      console.log(res)
      setPhoto(res.uri)
    }
}

getPermissionAsync = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to make this work!');
  }
}

  useEffect(() => {
    getPermissionAsync()
  })

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    {photo && (
      <Image
        source={{ uri: photo}}
        style={{ width: 300, height: 300 }}
      />
    )}
    <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
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
