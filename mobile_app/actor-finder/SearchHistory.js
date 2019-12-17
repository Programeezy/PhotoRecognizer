import React,  {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';

class SearchHistoryScreen extends React.Component {
    static navigationOptions = {
        title: 'Search History',
      };

    constructor(props) {
        super(props);
        this.state = {
            searches: [
                {
                    image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Bill_Gates_2018.jpg",
                    name: "Bill Gates"
                },
                {
                    image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Bill_Gates_2018.jpg",
                    name: "Bill Gates"
                }
        ]
        };
        this.getSearches = this.getSearches.bind(this);
    }

    componentDidMount() {
        this.getSearches();
    }

    async getSearches() {
        const authToken = await SecureStore.getItemAsync('auth_token');
        await fetch("http://192.168.43.154:8000/api/search_history/", {
          method: "POST",
          headers: {
            'Authorization': 'Token ' + authToken,
          },
          body: null,
        })
          .then(response => response.json())
          .then(response => {
            this.setState({searches: response.searches});
            console.log("Request success", response);
          })
          .catch(error => {
            console.log("Request error", error);
          });
    }
    render() {
        return (
            <ScrollView style={{ flex: 1, paddingTop: 25}} >
                <FlatList
                    data={this.state.searches}
                    renderItem={({item}) => 
                    <View style={styles.container}>
                        <Image 
                            source={{uri: item.image}} 
                            style={styles.image}
                            />
                        <Text style={styles.text}> {item.name} </Text>
                      </View>
                    } 
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 0,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 1
    },
    image: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: 'gray',
        width: 140, 
        height: 110
    },

    text: {
        fontSize: 28,
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        fontFamily: "sans-serif-light"
    } 
})
export default SearchHistoryScreen;