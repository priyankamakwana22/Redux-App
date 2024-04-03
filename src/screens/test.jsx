import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setAge, setName} from '../redux/action';

//  REDUX

const Login = ({navigation}) => {
  
  const {name, age} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  

  
  const setData = async () => {
    if (name.length == 0 || age.length == 0) {
      Alert.alert('Warning', 'Please write your full name');
    } else {
      try {
        dispatch(setName(name));
        dispatch(setAge(age));
        var user = {
          Name: name,
          Age: age,
        };
        // await AsyncStorage.setItem('Username', name);
        await AsyncStorage.setItem('UserData', JSON.stringify(user)); // Converting user object to string to store it in async storage
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Async Storage</Text>
      <Image style={styles.img} source={require('../assets/telephone.png')} />
      <TextInput
        style={styles.input}
        placeholder="Enter mail"
        onChangeText={name => setName(name)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter age"
        onChangeText={age => setAge(age)}
      />
      <Pressable style={styles.btn} onPress={setData}>
        <Text style={styles.txt1}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  txt: {fontSize: 30, fontWeight: '700'},
  txt1: {fontSize: 20, fontWeight: '500', color: 'white'},
  img: {height: 100, width: 100, margin: 20},
  input: {
    width: '95%',
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
  },
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

export default Login;