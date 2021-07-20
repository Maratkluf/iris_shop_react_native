import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

const {width, height} = Dimensions.get("screen");
const OPTIONS = ['S', 'M', 'L', 'XL'];
export default function ModalPicker(props) {

    const onPressItem = (option) => {
        props.changeModalVisibility(false);
        props.setData(option);
    };

    const option = OPTIONS.map((item, index) => {
        return (
            <TouchableOpacity 
                style={styles.option}
                key={index}
                onPress={() => onPressItem(item)}
            >
                <Text style={styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    });
  return (
    <TouchableOpacity onPress={() => props.changeModalVisibility(false)} style={styles.container}>
        <View style={styles.modal}>{option}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor:'white',
    borderRadius:3,
    borderWidth: 2,
    borderColor: 'gray',
    width: width*0.45,
    height: height*0.45,
  },
  option: {
    alignItems: 'center',
  },
  text:{
    color: 'gray',
    margin:20,
    fontSize: 20,
    fontWeight: 'bold',
  }
});