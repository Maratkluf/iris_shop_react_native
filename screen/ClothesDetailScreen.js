import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View, Image, FlatList, Dimensions, Button, ScrollView, Modal, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import firebase from '../database/firebase';
import RNPickerSelect from 'react-native-picker-select';
import { Touchable } from 'react-native';

const {width, height} = Dimensions.get("screen");
const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.65;
const HI = height - ITEM_HEIGHT;


const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;

export default function ClothesDetailScreen(props) {

  const [Clothes, setClothes] = useState({
    id: '',
    product: '',
    brand: '',
    name: '',
    information: '', 
    image: '',
    price: '',
    image2: '',
    image3: '',
    image4: '',
    color: '',
    group: '',
    
  });

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection('Clothes').doc(id)
    const doc = await dbRef.get();
    const Clothes = doc.data();
    setClothes({
      ...Clothes,
      id: doc.id,
    });
  }
  useEffect(() =>{
    getUserById(props.route.params.ClothesId)
  })
  function onOpen(){
    modalizeRef.current?.open();
  }
  const modalizeRef = useRef(null);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const images = [
    Clothes.image,
    Clothes.image2,
    Clothes.image3,
    Clothes.image4,
  ]
  return (
    
    <View>
      <View style={{height: ITEM_HEIGHT, overflow: 'hidden'}}>
        <Animated.FlatList 
          data = {images}
          keyExtractor = {(_, index) => index.toString()}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true}
          )}
          renderItem = {({item}) => {
            return <View>
              <Image source={{uri: item}} style={styles.image}></Image>
            </View>
          }}
        />
        <View style={styles.pagination}>
          {images.map((_, index) => {
            return <View key={index} style={styles.dot}/>
          })}
          <Animated.View style={[styles.dotIndicator, {
            transform: [{
              translateY: Animated.divide(scrollY, ITEM_HEIGHT).interpolate({
                inputRange: [0, 1],
                outputRange: [0, DOT_INDICATOR_SIZE]
              })
            }]
          }]}/>
        </View>
      </View>
      <View style={{justifyContent: 'flex-start', alignItems: 'center', height: height-ITEM_HEIGHT}}>
        {/* <Button title="Open Modal" onPress={onOpen}></Button> */}
      </View>
      <Modalize
      ref={modalizeRef}
      snapPoint={(height-ITEM_HEIGHT)*1.9}
      modalHeight={(height-ITEM_HEIGHT)*1.9}
      tapGestureEnabled={false}
      bounces={false}
      scrollEnabled={false}
      alwaysOpen={true, (height-ITEM_HEIGHT)*1.1}
      >
        <View style={{height: (height-ITEM_HEIGHT)*1.3}}>
          <Text style={styles.priceText}>{Clothes.price} руб.</Text>
          <Text style={styles.nameText}>{Clothes.product} {Clothes.brand} {Clothes.name}</Text>
          <Text style={styles.description}>{Clothes.information}</Text>
          <View style={styles.boxPicker}>
            <RNPickerSelect style={pickerSelectStyles}
              onValueChange={(value) => console.log(value)}   
              placeholder={{label: 'Выбери размер'}}   
              items={[
                  { label: 'S', value: 's' },
                  { label: 'M', value: 'm' },
                  { label: 'L', value: 'l' },
                  { label: 'XL', value: 'xl' },
              ]}
            />
            <TouchableOpacity style={styles.cart}>
              <Text style={styles.cartText}>Добавить в корзину</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: 'cover'
  },
  pagination: {
    position: 'absolute',
    top: ITEM_HEIGHT / 2.5,
    left: 20
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: 'gray',
    marginBottom: DOT_SPACING
  },
  dotIndicator: {
    width: DOT_INDICATOR_SIZE,
    height: DOT_INDICATOR_SIZE,
    borderRadius: DOT_INDICATOR_SIZE,
    borderWidth: 1,
    borderColor: 'gray',
    position: 'absolute',
    top: -DOT_SIZE / 2,
    left: -DOT_SIZE / 2,
  },
  priceText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'gray',
    fontFamily: 'Futura',
    marginTop: '5%',
    marginLeft: '10%'
  },
  nameText: {
    fontSize: 25,
    fontFamily: 'Futura',
    marginTop: '5%',
    marginLeft: '10%'
  },
  description: {
    fontSize: 13,
    fontFamily: 'Futura',
    marginTop: '3%',
    marginLeft: '10%'
  },
  boxPicker: {
    paddingHorizontal: 20,
    marginTop: '5%'
  },
  cart: {
    marginTop: '5%',
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
  },
  cartText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Futura',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 1,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 1,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});