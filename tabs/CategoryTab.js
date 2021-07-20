import * as React from 'react';
import { StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, Alert, Text, View } from 'react-native';

const {width} = Dimensions.get("window");

export default function TabTwoScreen({navigation}) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal snapToInterval={width} decelerationRate="fast" showsHorizontalScrollIndicator={false} bounces={true} scrollEventThrottle={1}>
          <View style={styles.inview}>
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Куртки')} >
              <Image 
                source={require('../assets/images/jackets.jpg')}
                style={{height: 300, width: width-10, resizeMode: "cover", marginLeft:5, marginTop: 5}}
              />
            </TouchableOpacity>
            <View style={styles.bottomInf}>
              <Text style={{fontSize: 20, fontWeight: '700'}}>КУРТКИ</Text>
              <Text style={{marginTop: 10}}>Найди свой стиль для этой весны.</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Куртки')} >
                  <View style={{marginTop:10, backgroundColor: '#000', width: 150}}>
                    <Text style={styles.buttonInf}> ПОСМОТРЕТЬ </Text>
                  </View>
                  <View style={styles.buttonBorder}></View>
                </TouchableOpacity>    
            </View>
          </View>

          <View style={styles.inview}>
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Толстовки')} >
              <Image 
                source={require('../assets/images/hoodie.jpg')}
                style={{height: 300, width: width-10, resizeMode: "cover", marginLeft:5, marginTop: 5}}
              />
            </TouchableOpacity>
            <View style={styles.bottomInf}>
              <Text style={{fontSize: 20, fontWeight: '700'}}>ТОЛСТОВКИ</Text>
              <Text style={{marginTop: 10}}>Найди свой стиль для этой весны.</Text>
              <TouchableOpacity
                  onPress={() => navigation.navigate('Толстовки')} >
                  <View style={{marginTop:10, backgroundColor: '#000', width: 150}}>
                    <Text style={styles.buttonInf}> ПОСМОТРЕТЬ </Text>
                  </View>
                  <View style={styles.buttonBorder}></View>
                </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.inview}>
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Брюки')} >
              <Image 
                source={require('../assets/images/bottoms.jpg')}
                style={{height: 300, width: width-10, resizeMode: "cover", marginLeft:5, marginTop: 5}}
              />
            </TouchableOpacity>
            <View style={styles.bottomInf}>
              <Text style={{fontSize: 20, fontWeight: '700'}}>БРЮКИ</Text>
              <Text style={{marginTop: 10}}>Найди свой стиль для этой весны.</Text>
              <TouchableOpacity
                  onPress={() => navigation.navigate('Брюки')} >
                  <View style={{marginTop:10, backgroundColor: '#000', width: 150}}>
                    <Text style={styles.buttonInf}> ПОСМОТРЕТЬ </Text>
                  </View>
                  <View style={styles.buttonBorder}></View>
                </TouchableOpacity>
            </View>
          </View>
          
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inview: {
    width, 
  },
  bottomInf: {
    flex:1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    alignContent: 'center', 
    position: 'relative'
  },
  buttonInf: {
    color: '#fff',
    textAlign: 'center', 
    paddingHorizontal: 8, 
    paddingVertical: 15
  },
  buttonBorder: {
    position: 'absolute', 
    marginTop:19,
    marginLeft:7,
    zIndex: -999, 
    borderColor: '#000', 
    borderWidth: 2, 
    width: 150, 
    height: 45 
  },
});