import React, { useEffect, useState, Component } from 'react';
import { StyleSheet, Image, Dimensions, Alert, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const {width, height} = Dimensions.get("window");

export default class TabOneScreen extends Component {
  componentDidMount(){
    firebase.auth().signInWithEmailAndPassword('marat310101@gmail.com', 'apolon12')
  } 
  render() {
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          
          <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Discount')} style={{marginLeft: width*0.08}}>
            <View style={styles.boxPic}>
              <Image source={require('../assets/images/main-back3.png')} style={{resizeMode: 'cover', width: width*0.9, height: 141}}></Image>
              <View style={{position: 'absolute', borderColor: 'black', borderWidth: 2, width: width*0.9, height: 141, zIndex:-99, marginTop: 7, marginLeft: 7}}></View>
              <View style={{position: 'absolute', width: width*0.9, height: 141, justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{backgroundColor: 'black', color: 'white', fontSize: 17, padding: 10, fontWeight: 'bold'}}>СКИДКИ ДО 40%</Text>
              </View>
            </View>
          </TouchableOpacity>
  
          <View style={styles.miniBox}>
            <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Мужское')}>
              <View style={styles.boxpolPic}>
                <Image source={require('../assets/images/coll-manXD.png')} style={{resizeMode: 'cover', width: width*0.4, height: 151}}></Image>
                <View style={{position: 'absolute', borderColor: 'black', borderWidth: 2, width: width*0.4, height: 151, zIndex:-99, marginTop: 7, marginLeft: 7}}></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Мужское')}>
              <View style={styles.boxpolPic}>
                <Image source={require('../assets/images/coll-womanXD.png')} style={{resizeMode: 'cover', width: width*0.4, height: 151}}></Image>
                <View style={{position: 'absolute', borderColor: 'black', borderWidth: 2, width: width*0.4, height: 151, zIndex:-99, marginTop: 7, marginLeft: 7}}></View>
              </View>
            </TouchableOpacity>
          </View>
  
          <View style={styles.miniBox}>
            <TouchableOpacity activeOpacity={1} onPress={() => Alert.alert('Тут будет переход.')}>
              <View style={styles.boxpolPic}>
                <Image source={require('../assets/images/baseborange.png')} style={{resizeMode: 'cover', width: width*0.4, height: 151}}></Image>
                <View style={{position: 'absolute', borderColor: 'black', borderWidth: 2, width: width*0.4, height: 151, zIndex:-99, marginTop: 7, marginLeft: 7}}></View>
              </View>     
              <Text style={styles.title}>ДУХ ТВОРЧЕСТВА</Text>
              <Text style={styles.subtitle}>Оранжевая магия</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Джинсы')}>
              <View style={styles.boxpolPic}>
                <Image source={require('../assets/images/men-jince.jpg')} style={{resizeMode: 'cover', width: width*0.4, height: 151}}></Image>
                <View style={{position: 'absolute', borderColor: 'black', borderWidth: 2, width: width*0.4, height: 151, zIndex:-99, marginTop: 7, marginLeft: 7}}></View>
              </View>   
              <Text style={styles.title}>НОВЫЙ СЕЗОН</Text>
              <Text style={styles.subtitle}>Время пришло...</Text>
            </TouchableOpacity>
          </View>
  
          <View style={styles.miniBox}>
            <TouchableOpacity activeOpacity={1} onPress={() => Alert.alert('Тут будет переход.')}>
              <View style={styles.boxpolPic}>
                <Image source={require('../assets/images/plat.png')} style={{resizeMode: 'cover', width: width*0.4, height: 151}}></Image>
                <View style={{position: 'absolute', borderColor: 'black', borderWidth: 2, width: width*0.4, height: 151, zIndex:-99, marginTop: 7, marginLeft: 7}}></View>
              </View>
              <Text style={styles.title}>ПЛАТЬЯ</Text>
              <Text style={styles.subtitle}>Встречай лето!</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => Alert.alert('Тут будет переход.')}>
              <View style={styles.boxpolPic}>
                <Image source={require('../assets/images/drmartens.png')} style={{resizeMode: 'cover', width:  width*0.4, height: 151}}></Image>
                <View style={{position: 'absolute', borderColor: 'black', borderWidth: 2, width: width*0.4, height: 151, zIndex:-99, marginTop: 7, marginLeft: 7}}></View>  
              </View>
              <Text style={styles.title}>DR MARTENS</Text>
              <Text style={styles.subtitle}>То, что ты давно ищешь</Text>
            </TouchableOpacity>
          </View>
  
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15
  },
  boxPic: {
    marginTop: 8,
    width: width,
    height: 148,
    position: 'relative',
  },
  miniBox: {
    flex: 1,
    marginTop: 23,
    marginLeft: width*0.08,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  boxpolPic: {
    position: 'relative',
    width: width*0.5,
    height: 160
  },
  title: {
    textAlign: 'center', 
    fontWeight: '500', 
    marginTop: 5, 
    marginLeft: -width*0.08,
    fontSize: 13
  },
  subtitle: {
    textAlign: 'center', 
    marginTop: 3, 
    fontSize: 11, 
    color: 'gray',
    marginLeft: -width*0.08
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});