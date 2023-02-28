import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet, Image} from 'react-native';
import { Provider } from 'react-redux';
import {store} from './src/store';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddTodo from './src/screens/AddTodo';
import ListTodo from './src/screens/ListTodo';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerTitleAlign: 'center'}}
          initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={headerStyle}
          />
           <Stack.Screen name="AddTodo" component={AddTodo} />
          <Stack.Screen name="ListTodo" component={ListTodo} />
          
        </Stack.Navigator>
        
      </NavigationContainer>
    </Provider>
  );
};

const headerStyle = {
  title: 'Get this stuff done',
  headerStyle: {backgroundColor: '#fafcfe'},
  headerTitleStyle: {color: '#48494b'},
  headerTitleAlign: {marginRight: 50},
  headerLeft: () => (
    <View style={styles.iconContainer}>
      <IonIcon
        name="menu"
        size={25}
        color={'black'}
        onPress={() => {
          console.log('menu-clicked');
        }}
      />
      <Image
        source={require('./src/assets/Images/dart.png')}
        style={styles.Image}
        size={25}
      />
    </View>
  ),
  headerRight: () => (
    <View style={styles.iconContainer}>
      <IonIcon
        name="share-social"
        size={25}
        color={'black'}
        onPress={() => {
          console.log('share-clicked');
        }}
      />
      <Icon
        name="comment-text-outline"
        size={25}
        color={'black'}
        onPress={() => {
          console.log('comment-box-clicked');
        }}
      />
      <Icon
        name="dots-horizontal"
        size={25}
        color={'black'}
        onPress={() => {
          console.log('dots-clicked');
        }}
      />
    </View>
  ),
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  icon: {
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 100,
    marginTop: 10,
  },
  Image: {
    width: 38,
    height: 28,
    marginRight: 30,
    marginLeft: 10,
  },
});
export default App;