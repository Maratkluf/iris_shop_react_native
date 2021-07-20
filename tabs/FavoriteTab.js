import React, {Component, useState, useEffect, useRef} from 'react';
import { StyleSheet, Dimensions, Text, Image, View, FlatList, Button, TouchableOpacity, TouchableHighlight, Animated, TouchableWithoutFeedback, useWindowDimensions} from 'react-native';
import * as firebas from 'firebase'
import { SwipeListView } from 'react-native-swipe-list-view';
import { Icon } from 'react-native-eva-icons';
import { Avatar, ListItem} from 'react-native-elements';


const {width, height} = Dimensions.get("window");
var data = []
var currentUser

const COLORS = {
  red: '#cc0000',
  green: '#4cA64c',
  blue: '#4c4cff',
  white: '#fff',
  grey: '#ddd',
};



const VisisbleItem = props => {
  const {data} = props;

  return (
    <View style={styles.rowFront}>
      <View>
        <Image source={{uri: data.item.image}} style={{resizeMode: 'cover', width: 80, height: 80, marginLeft: 15, borderRadius: 50}}></Image>
      </View>
      <View style={{marginLeft: 30, justifyContent: 'space-evenly', height:100}}>
        <Text style={{fontSize: 16, fontFamily: 'Futura', width: 200}}>{data.item.product} {data.item.brand} {data.item.name}</Text>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'gray', fontFamily: 'Futura'}}>{data.item.price}</Text>
      </View>
    </View>
  );  
};

const HiddenItemWithActions = props => {
  const {rightActionActivated, swipeAnimatedValue, data} = props;

  return (
    <Animated.View style={styles.rowBack}>
      <TouchableWithoutFeedback onPress={() => console.log('touched')}>
        <View style={[
          styles.backBtn,
          styles.backRightBtn,
          styles.backRightBtnRight,
          { 
            width: 179,
          
          }
        ]}>
          <View style={styles.backBtnInner}>
            <Icon name='trash-2-outline' fill='#fff' width={26} height={26}></Icon>
            <Text style={styles.backBtnText}>Delete</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default function TabFourScreen() {

  const {width: screenWidth, height: screenHeight} = useWindowDimensions();

  const [clothes, setClothes] = useState([]);
  currentUser = firebas.auth().currentUser

  useEffect(() =>{
    const clothRef = firebas.database().ref('favourites/' + currentUser.uid);
    const OnLoadingListener = clothRef.on('value', snapshot => {
      setClothes([]);
      snapshot.forEach(function(childSnapshot) {
        setClothes(clothes => [...clothes, childSnapshot.val()]);
      });
    });
    // return() => {
    //   useRef.off('value', OnLoadingListener);
    // }
  }, [])

  const deleteAll = () => {
    firebas.database().ref(currentUser.uid).remove().then(() => {
      setClothes([]);
    });
  };

  const renderItem = (data, rowMap) => (
    <VisisbleItem data={data} rowMap={rowMap}/>
  )

  const renderHiddenItem = (data, rowMap) => (
    <HiddenItemWithActions data={data} rowMap={rowMap}/>
  )

  const onRightActionStatusChange = Item => {
    
    firebas.database().ref('favourites/' + currentUser.uid).remove();

    // firebas.database().ref(currentUser.uid).remove().then(() => {
    //   setClothes([]);
    // })
  }

  const swipeGestureEnded = () => {
    console.log('swipe ended')
  }

  const listEmptyComponent = () => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', height: screenHeight * 0.8, backgroundColor: 'white'}}>
            <Text style={{fontSize:20, fontWeight: 'bold'}}>У вас нет избранных товаров.</Text>
        </View>
    )
  }

  return (     
    <View>
      <SwipeListView
        
        data={clothes}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-60}
        disableRightSwipe
        stopRightSwipe={-180}
        rightActivationValue={-179}
        rightActionActivated={-screenWidth}
        onRightActionStatusChange={onRightActionStatusChange}
        swipeGestureEnded={swipeGestureEnded}
        swipeToOpenPercent={10}
        swipeToClosePercent={10}
        useNativeDriver={false}
        ListEmptyComponent={listEmptyComponent}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  rowFront: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backBtn: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    justifyContent: 'center',
  },
  backLeftBtn: {
    alignItems: 'flex-end',
    backgroundColor: COLORS.green,
    paddingRight: 16,
  },
  backRightBtn: {
    right: 0,
    paddingRight: 7,
    alignItems: 'flex-end',
    paddingLeft: 12,
  },
  backRightBtnLeft: {
    backgroundColor: COLORS.blue,
  },
  backRightBtnRight: {
    backgroundColor: COLORS.red,
  },
  backBtnInner: {
    alignItems: 'center',
  },
  backBtnText: {
    color: COLORS.white,
    marginTop: 2,
  },
});