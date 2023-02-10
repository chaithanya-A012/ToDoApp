import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  DeviceEventEmitter,
} from 'react-native';
import React from 'react';
import {FloatingAction} from 'react-native-floating-action';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {EventEmitter} from 'react-native/Libraries/vendor/emitter/EventEmitter';
import {NativeEventEmitter} from 'react-native/Libraries/EventEmitter/NativeEventEmitter';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Homescreen = props => {
  const [todoItems, setTodoItems] = React.useState([]);
  const [refresh, setRefresh] = React.useState(true);

  const Datahandler = arg => {
    console.log('Received Data ', arg);
    updateToDoList(arg);
  };
  DeviceEventEmitter.addListener('got-data', Datahandler);

  const updateToDoList = newtodo => {
    // console.log("updateToDoList", newtodo)
    let a = [];
    a = [].concat(todoItems, {...newtodo, id: todoItems.length + 1});
    setTodoItems(a);
  };

  const updatedTodo = val => {
    objIndex = todoItems.findIndex(obj => obj.id == val.id);
    console.log('val', val);

    //Update object's name property.
    todoItems[objIndex].completed = !val.completed;

    //Log object to console again.
    setRefresh(!refresh);
  };

  console.log('updatedTodo', updatedTodo);

  //------------------------------new-------------------------------------------------------------

  const subtaskupdatedTodo = value => {
    console.log('value', value);

    for (let i of todoItems) {
      for (let j of i.subTasks) {
        console.log('second loop', j);
        if (j.subid === value.subid) {
          j.subTaskCompleted = !value.subTaskcompleted;
          setRefresh(!refresh);
        }
      }
    }

    console.log('updated list final ', todoItems);
  };

  return (
    <View style={[styles.container, {flexDirection: 'column'}]}>
      {console.log(
        '----------------------------- todoItems -------------------- \n ',
        JSON.stringify(todoItems),
      )}
      {console.log(
        '----------------------------- todoItems.subTasks -------------------- \n ',
        JSON.stringify(todoItems.subTasks),
      )}

      <View style={{flex: 1, backgroundColor: 'blue'}} />
      <View>
        <Image
          source={require('../../assets/Images/dart.png')}
          style={styles.Image1}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 38,
            fontWeight: 'bold',
            textAlign: 'left',
            // paddingLeft:15,
            bottom: 30,
            position:'relative',
            left:15,
            fontFamily: "Open Sans"
          }}>
          Get this stuff done
        </Text>

        {/* ----------------------Finish by end of week--------------------------- */}

        <View>
          <Text style={{color: '#000', fontSize: 22, fontWeight: 'bold', paddingLeft:15}}>
            Finish by end of week
          </Text>
        
          <FlatList
            data={todoItems}
            horizontal={false}
            renderItem={({item}) => {
              // console.log('item_newtodo_list',JSON.stringify(item));
              return (
                <View style={{justifyContent: 'space-between'}}>
                  <TouchableOpacity style={{flexDirection: 'row'}}>
                    <BouncyCheckbox
                      isChecked={item.completed}
                      fillColor="blue"
                      onPress={() => updatedTodo(item)}
                    />
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 22,
                        // padding:5,
                        // backgroundColor: 'rgb(220,220,220)',
                        // borderRadius: 10,
                        // paddingHorizontal: 10,
                        // marginVertical: 10,
                        width: '90%',
                        // textDecorationLine: item.completed
                        //   ? 'line-through'
                        //   : 'none',
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>

                  <Text  style={{
                        color: '#000',
                        fontSize: 16,
                        marginLeft:26,
                        // backgroundColor: 'rgb(220,220,220)',
                        // borderRadius: 10,
                        // paddingHorizontal: 10,
                        // marginVertical: 10,
                        // width: '90%',
                      
                      }} >{item.description}</Text>

                  {/* Sub Task Data */}

                  <FlatList
                    data={item.subTasks}
                    horizontal={false}
                    renderItem={({item}) => {
                      return (
                        <View style={{justifyContent: 'space-between'}}>
                          <TouchableOpacity style={{flexDirection: 'row'}}>
                            <BouncyCheckbox
                              isChecked={item.subTaskcompleted}
                              // filterColor="red"
                              fillColor="blue"
                              unfillColor="#ffffff"
                              // iconstyle={{borderColor:"blue"}}
                              onPress={() => subtaskupdatedTodo(item)}
                            />
                            <Text style={{ fontSize: 22,color:'black'}}>{item.subTaskTitle}</Text>
                          </TouchableOpacity>
                          <Text style={{ color:'black'}}>{item.subTaskDescription}</Text>
                        </View>
                      );
                    }}
                    style={{height: deviceHeight * 0.2,marginLeft:33}}
                  />

                  {/* <FlatList
                    data={item.subTasks}
                    horizontal={false}
                    renderItem={({item}) => {
                      return (
                        <View style={{justifyContent: 'space-between'}}>
                          <Text>{item.subTaskTitle}</Text>
                          <Text>{item.subTaskDescription}</Text>
                        </View>
                      );
                    }}
                    // style={{height: deviceHeight * 0.2}}
                  /> */}
                </View>
              );
            }}
            style={{height: deviceHeight * 0.2,backgroundColor: '#fff',
            padding: 10,
            fontSize: 22,
            width: '100%',
            marginTop: 15,
            // marginLeft:20,
            color: '#000',
            borderRadius: 10,}}
          />

          {/* ------------------------finish end of day------------------------------ */}
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: 'bold',
              marginLeft:10,
              paddingLeft:5,
            }}>
            Finish by end of day
          </Text>

          <FlatList
            data={todoItems}
            horizontal={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              console.log('item', item);
              return (
                <View style={{justifyContent: 'space-between'}}>
                  {item.completed && (
                    <TouchableOpacity style={{flexDirection: 'row'}}>
                      <BouncyCheckbox
                        isChecked={item.completed}
                        // filterColor="blue"
                        fillColor="blue"
                        unfillColor="#ffffff"

                        onPress={() => updatedTodo(item)}
                      />
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 16,
                          // width: '90%',
                          textDecorationLine: item.completed
                            ? 'line-through'
                            : 'none',
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {/* <Text>{item.title}</Text> */}
                  {item.completed && (
                    <Text
                      style={{
                        textDecorationLine: item.completed
                          ? 'line-through'
                          : 'none',
                      }}>
                      {item.description}
                    </Text>
                  )}

                  <FlatList
                    data={item.subTasks}
                    horizontal={false}
                    keyExtractor={item => item.subid}
                    renderItem={({item}) => {
                      console.log('item',item);
                      return (
                        <View style={{justifyContent: 'space-between'}}>
                          {item.subTaskCompleted && (
                            <TouchableOpacity style={{flexDirection: 'row'}}>
                              <BouncyCheckbox
                                isChecked={item.subTaskCompleted}
                                // filterColor="red"
                                fillColor="blue"
                                unfillColor="#ffffff"
                                // iconstyle={{borderColor:"blue"}}
                                onPress={() => subtaskupdatedTodo(item)}
                              />
                              <Text
                                style={{
                                  color: '#000',
                                  fontSize: 16,
                                  // width: '90%',
                                  textDecorationLine: item.subTaskCompleted
                                    ? 'line-through'
                                    : 'none',
                                }}>
                                  {item.subTaskTitle}
                              </Text>
                            </TouchableOpacity>
                          )}
                          {item.subTaskCompleted && (
                            <Text style={{
                              color: '#000',
                              fontSize: 16,
                              // width: '90%',
                              textDecorationLine: item.subTaskCompleted
                                ? 'line-through'
                                : 'none',
                            }}>
                            {item.subTaskDescription}</Text>
                          )}
                        </View>
                      );
                    }}
                    style={{height: deviceHeight * 0.2,marginLeft:33}}
                    // style={{height: deviceHeight * 0.2}}
                  />
                </View>
              );
            }}
            extraData={refresh}
            style={{height: deviceHeight * 0.25,backgroundColor: '#fff',
            padding: 10,
            width: '100%',
            marginTop: 15,
            // marginLeft:20,
            color: '#000',
            borderRadius: 10,}}
          />
          {/* </ScrollView> */}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FloatingAction
            onPressMain={() => {
              props.navigation.navigate('Addnotes', {
                // updateToDoList: updateToDoList,
                todoList: todoItems,
              });
            }}
            
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  Image1: {
    width: 70,
    height: 70,
    marginLeft: 10,
    marginRight: 20,
    // padding:20,
    // marginTop:60,
    backgroundColor: '#FFF',
    borderRadius: 50,
    top: -40,
  },
});

export default Homescreen;
