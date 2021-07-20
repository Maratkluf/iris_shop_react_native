import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, FlatList, Alert, Header, Item, Input, Icon, Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../database/firebase';
import * as firebas from 'firebase'
import { Avatar, ListItem, SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import SwitchSelector from "react-native-switch-selector";

const {width, height} = Dimensions.get("window");


var currentUser

export default function ClothesScreen(props) {

  const [Clothes, setClothes] = useState([])

  useEffect(() => {
    firebase.db.collection('Clothes').onSnapshot(querySnapshot => {
      const Clothes = [];
      
      querySnapshot.docs.forEach(doc => {
        const {product, brand, name, information, image, price, image2, image3, image4} = doc.data();
        Clothes.push({
          id: doc.id,
          product, 
          brand, 
          name, 
          information, 
          image, 
          price,
          image2,
          image3,
          image4,
          
        })
      });
    setClothes(Clothes)
    });             
  }, [])

  addToFavourites = (clothId, clothProduct, clothBrand, clothName, clothPrice, clothImage, ) => {
    currentUser = firebas.auth().currentUser

    var clothesData = {
      id: clothId,
      product: clothProduct,
      brand: clothBrand,
      name: clothName,
      price: clothPrice,
      image: clothImage,
    }

    var newClothesKey = firebas.database().ref('favourites/' + currentUser.uid).push().key;

    var updates = {};
    updates['/favourites/' + currentUser.uid + '/' + newClothesKey] = clothesData;
    return firebas.database().ref().update(updates);
    // var databaseRef = await firebas.database().ref('favourites/' + currentUser.uid).child('favourites').push().key;
    
    // databaseRef.set({
    //   'id': clothId,
    //   'product': clothProduct,
    //   'brand': clothBrand,
    //   'name': clothName,
    //   'price': clothPrice,
    //   'image': clothImage,
    // })
  }

  withoutSort = () => {   
    firebase.db.collection('Clothes').onSnapshot(querySnapshot => {
      const Clothes = [];
      
      querySnapshot.docs.forEach(doc => {
        const {product, brand, name, information, image, price, image2, image3, image4,} = doc.data();
        Clothes.push({
          id: doc.id,
          product, 
          brand, 
          name, 
          information, 
          image, 
          price,
          image2,
          image3,
          image4,
        })
      });
    setClothes(Clothes)
    });             
  }

  sortAsc = () => {   
    firebase.db.collection('Clothes').orderBy('price', 'asc').onSnapshot(querySnapshot => {
      const Clothes = [];
      
      querySnapshot.docs.forEach(doc => {
        const {product, brand, name, information, image, price, image2, image3, image4,} = doc.data();
        Clothes.push({
          id: doc.id,
          product, 
          brand, 
          name, 
          information, 
          image, 
          price,
          image2,
          image3,
          image4,
        })
      });
    setClothes(Clothes)
    });             
  }

  sortDesc = () => {   
      firebase.db.collection('Clothes').orderBy('price', 'desc').onSnapshot(querySnapshot => {
        const Clothes = [];
        
        querySnapshot.docs.forEach(doc => {
          const {product, brand, name, information, image, price, image2, image3, image4,} = doc.data();
          Clothes.push({
            id: doc.id,
            product, 
            brand, 
            name, 
            information, 
            image, 
            price,
            image2,
            image3,
            image4,
          })
        });
      setClothes(Clothes)
      });             
  }

  // const options = [
  //   { label: "Без сорт.", value: 'withoutSort()' },
  //   { label: "По возр.", value: 'sortAsc()' },
  //   { label: "По убыв.", value: 'sortDesc()' },
  // ];

  return (
      <ScrollView style={{backgroundColor: 'white'}}>
        {/* <SwitchSelector
          options={options}
          initial={0}
          onPress={value => alert(value)}
        >
        </SwitchSelector> */}
        <View style={{flexDirection:'row', marginTop: 10, justifyContent: 'center'}}>
          <TouchableOpacity style={{backgroundColor:'white', paddingHorizontal: 20, paddingVertical: 5, borderTopLeftRadius:6, borderBottomLeftRadius:6, borderWidth:1, borderColor:'black'}} onPress={() => withoutSort()}>
            <Text style={{color: 'black', fontSize: 14,fontFamily: 'Futura'}}>Без сорт.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'white', paddingHorizontal: 20, paddingVertical: 5, borderWidth:1, borderColor:'black'}} onPress={() => sortAsc()}>
            <Text style={{color: 'black', fontSize: 14,fontFamily: 'Futura'}}>По возр.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'white', paddingHorizontal: 20, paddingVertical: 5, borderTopRightRadius:6, borderBottomRightRadius:6, borderWidth:1, borderColor:'black'}} onPress={() => sortDesc()}>
            <Text style={{color: 'black', fontSize: 14,fontFamily: 'Futura'}}>По убыв.</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>  
        {
          Clothes.map(cloth => {
            return (
                <View key={cloth.id} style={styles.box}>
                  <TouchableOpacity  style={{height: 250, zIndex: 0}} onPress={() => 
                    props.navigation.navigate('Товар', {
                      ClothesId: cloth.id
                    })
                  }>
                  <Image source={{uri: cloth.image}} style={{resizeMode: 'cover', width:width*0.5, height: 150}}></Image>
                    <View style={styles.inner}>
                      <Text style={styles.priceText}>{cloth.price} руб.</Text>
                      <Text style={styles.nameText}>{cloth.product} {cloth.brand} {cloth.name}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.heart}>
                    <TouchableOpacity onPress={() => addToFavourites( cloth.id, cloth.product, cloth.brand, cloth.name, cloth.price, cloth.image,)}>
                      <Ionicons name="heart-outline" size={30}/>
                    </TouchableOpacity>
                  </View>
                </View>           
            )
          })
        }
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  box: {
    overflow: 'hidden',
    width: '49%',
    padding: 5,
    height: 250, 
    position: 'relative'
  },
  inner: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    fontFamily: 'Futura'
  },
  nameText: {
    fontSize: 16,
    width: 200,
    fontFamily: 'Futura'
  },
  heart: {
    position: 'absolute', 
    top: 5, 
    right: 5, 
    zIndex: 1
  },

});