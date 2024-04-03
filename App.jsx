import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button, FlatList, Pressable, Text} from 'react-native';
import ListItem from './SimpleRedux/component/ListItem';
import { connect } from 'react-redux';
import { addPlace } from './SimpleRedux/action/place';
class App extends Component {
  state = {
    placeName: '',
    places: [],
  };

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === '') {
      return;
    }
    this.props.add(this.state.placeName);
  };

  placeNameChangeHandler = value => {
    this.setState({
      placeName: value,
    });
  };

  placesOutput = () => {
    return (
      <FlatList
      style={styles.listContainer}
        data={this.props.places}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ value => (
          <ListItem placeName={value.item.value} />
        )}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search Places"
            style={styles.placeInput}
            value={this.props.placeName}
            onChangeText={this.placeNameChangeHandler}/>
          
          <Pressable style={styles.placeButton}
            onPress={this.placeSubmitHandler}>
            <Text>Add</Text>
          </Pressable>
        </View>
        <View style={styles.listContainer}>
          {this.placesOutput()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  placeInput: {
    width: '70%',
  },
  placeButton: {
    width: '30%',
  },
  listContainer: {
    width: '100%',
  },
});

const mapStateToProps = state => {
  return {
    places: state.places.places
  }
}
const mapDispatchToProps = dispatch => {
  return {
    add: (name) => {
      dispatch(addPlace(name))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import React from 'react';
// import Login from './src/screens/Login';
// import {Text} from 'react-native';
// import 'react-native-gesture-handler';
// import Home from './src/screens/Home';
// import {Provider} from 'react-redux';
// import store from './src/redux/store';

// const App = () => {
//   const Stack = createStackNavigator();
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="Home" component={Home} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// };

// export default App;
