import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DoneScreen = props => {
  console.log('props', props.route.params);
  console.log('props888', props.route.params.data.title);
  console.log('props3', props.route.params.data.description);
  console.log('newdata',props.route.params.newdata);

  return (
    <View
      style={{
        alignItems: 'center',
        paddingTop: Dimensions.get('window').height / 3,
      }}>
     
      <View style={{flexDirection: 'column', alignItems:'center', borderWidth:1,backgroundColor: 'rgb(220,220,220)'}}>
        <Text style={{fontSize:30,textAlign:'center', padding:8,fontFamily:'Cochin',fontWeight:'bold',color:'black'}}>{props.route.params.data.title}</Text>
        <Text style={{justifyContent:'center',textAlign:'center',alignItems:'flex-start', padding:8,fontFamily:'Cochin',fontWeight:'normal',color:'black',fontStyle:'italic'}}>{props.route.params.data.description}</Text>
        <Text style={{fontSize:30,textAlign:'center', padding:8,fontFamily:'Cochin',fontWeight:'bold',color:'black'}}>{props.route.params.newdata.subTaskTitle}</Text>
        <Text style={{justifyContent:'center',textAlign:'center',alignItems:'flex-start', padding:8,fontFamily:'Cochin',fontWeight:'normal',color:'black',fontStyle:'italic'}}>{props.route.params.newdata.subTaskDescription}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Homescreen');
        }}
        style={{
          backgroundColor: 'blue',
          width: 100,
          borderRadius: 10,
          alignItems: 'center',
          padding: 10,
        }}>
        <Text style={{color: '#fff', fontSize: 19, alignItems: 'center'}}>
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DoneScreen;
