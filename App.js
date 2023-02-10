import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/Screens/LoginScreen';
import Homescreen from './src/Screens/Homescreen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, StyleSheet, Image} from 'react-native';
import Addnotes from './src/Screens/Addnotes';
import DoneScreen from './src/Screens/DoneScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerTitleAlign: 'center'}}
        initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="Homescreen"
          component={Homescreen}
          options={headerStyle}
        />
        <Stack.Screen name="Addnotes" component={Addnotes} />
        <Stack.Screen name="DoneScreen" component={DoneScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const headerStyle = {
  title: 'Get this stuff done',
  headerStyle: {backgroundColor: '#fafcfe'},
  headerTitleStyle: {color: '#48494b'},
  headerTitleAlign: {marginRight:50},
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
        source={require('./assets/Images/dart.png')}
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
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 100,
    marginTop:10,

  },
  Image: {
    width: 38,
    height: 28,
    // marginLeft : 10,
    marginRight: 30,
    // paddingLeft:5,
    marginLeft:10,
  
    // backgroundColor:'pink'
  },
});
export default MyStack;
