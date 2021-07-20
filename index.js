import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiscountScreen from './screen/DiscountScreen';
import IrisTab from './tabs/IrisTab';
import CategoryTab from './tabs/CategoryTab';
import CartTab from './tabs/CartTab';
import FavoriteTab from './tabs/FavoriteTab';
import ClothesScreen from './screen/ClothesScreen';
import ClothesDetailScreen from './screen/ClothesDetailScreen';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
 return (
   <HomeStack.Navigator>
    <HomeStack.Screen name="IRIS" component={IrisTab} />             
    <HomeStack.Screen name="Discount" component={DiscountScreen} />
    <HomeStack.Screen name="Clothes" component={ClothesScreen} />
    <HomeStack.Screen name="ClothesDetail" component={ClothesDetailScreen} />
   </HomeStack.Navigator>
  );
}
const SettingsStack = createStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Категории" component={CategoryTab} />
      <SettingsStack.Screen name="Clothes" component={ClothesScreen} />
      <SettingsStack.Screen name="ClothesDetail" component={ClothesDetailScreen}/>
    </SettingsStack.Navigator>
  );
}
const CartStack = createStackNavigator();
function CartStackScreen() {
  return (
    <CartStack.Navigator>
      <CartStack.Screen name="Корзина" component={CartTab} />
    </CartStack.Navigator>
  );
}
const FavStack = createStackNavigator();
function FavStackScreen() {
  return (
    <FavStack.Navigator>
      <FavStack.Screen name="Избранное" component={FavoriteTab} />
    </FavStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
    tabBarOptions={{
    activeTintColor: 'black',
    inactiveTintColor: 'gray',
    }}>
        <Tab.Screen name="IRIS" component={HomeStackScreen} options={{tabBarIcon: ({ color }) => <MaterialCommunityIcons name="view-dashboard-outline" size={25} color={color} style={{ marginBottom: -3 }}/>,}}/>
        <Tab.Screen name="Категории" component={SettingsStackScreen} options={{tabBarIcon: ({ color }) => <Ionicons name="ios-search" size={25} color={color} style={{ marginBottom: -3 }}/>,}}/>
        <Tab.Screen name="Корзина" component={CartStackScreen} options={{tabBarIcon: ({ color }) => <Ionicons name="cart-outline" size={25} color={color} style={{ marginBottom: -3 }}/>,}}/>
        <Tab.Screen name="Избранное" component={FavStackScreen} options={{tabBarIcon: ({ color }) => <Ionicons name="heart-outline" size={25} color={color} style={{ marginBottom: -3 }}/>,}}/>
      </Tab.Navigator>
    </NavigationContainer>
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