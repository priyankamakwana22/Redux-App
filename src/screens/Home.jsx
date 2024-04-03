import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert,TextInput , StyleSheet, Text, View, Pressable} from 'react-native';
// redux
import { useSelector, useDispatch} from 'react-redux';
import { setName, setAge } from '../redux/action';

const Home = ({navigation}) => {
  const {name, age} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  },[])

  const getData = () => {
    try{
        AsyncStorage.getItem('UserData').then(value => {
            if(value !== null)
            {
                let user = JSON.parse(value);
                dispatch(setName(user.Name));
                dispatch(setAge(user.Age));
                // console.log(name);
            }
        })
    }catch(error){
        console.log(error)
    }
  }

  const removeItem = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login')
    }catch(error){
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{name}</Text>
      <Text>{age}</Text>
      <Text>HomeScreen</Text>
      <TextInput
        style={styles.input}
        onChangeText={name => setName(name)}
        placeholder="Enter name"></TextInput>

      <Pressable style={styles.btn}>
        <Text style={styles.txt1}>Update</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={removeItem} >
        <Text style={styles.txt1}>Delete</Text>
      </Pressable>
      <Pressable style={styles.btn}>
        <Text style={styles.txt1}>Increase</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  input: {
    width: '95%',
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    padding: 15,
  },
  txt1: {fontSize: 20, fontWeight: '500', color: 'white'},
  btn: {
    height: 40,
    marginTop: 40,
    width: 80,
    backgroundColor: '#5072A7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
