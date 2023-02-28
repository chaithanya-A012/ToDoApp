import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {FloatingAction} from 'react-native-floating-action';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useSelector} from 'react-redux';

const deviceHeight = Dimensions.get('window').height;

const HomeScreen = props => {
  const [todoItems, setTodoItems] = React.useState([]);
  const [refresh, setRefresh] = React.useState(true);

  const todoList = useSelector(state => state.todo);

  console.log('todo list from slice home screen', todoList.todoList);

  useEffect(() => {
    console.log('todoItemsnew', todoList);
    setTodoItems(todoList.todoList);
  }, [todoList]);

  const updatedTodo = val => {
    objIndex = todoItems.findIndex(obj => obj.id == val.id);
    console.log('val', val);

    //Update object's name property.
    todoItems[objIndex].completed = !val.completed;

    //Log object to console again.
    setRefresh(!refresh);
  };
  console.log('updatedTodo', updatedTodo);

  //------------------------------subtasks---------------------------------------------------------

  const subtaskupdatedTodo = value => {
    console.log('value', value);

    for (let i of todoItems) {
      for (let j of i.subTasks) {
        console.log('second loop', j);
        if (j.subid === value.subid) {
          j.subTaskCompleted = !value.subTaskCompleted;
          setRefresh(!refresh);
        }
      }
    }

    console.log('updated list final ', todoItems);
  };

  {
    console.log(
      '----------------------------- todoItems -------------------- \n ',
      JSON.stringify(todoItems),
    );
  }
  {
    console.log(
      '----------------------------- todoItems.subTasks -------------------- \n ',
      JSON.stringify(todoItems.subTasks),
    );
  }

  return (
    <View style={styles.maincontainer}>
      <View style={styles.container} />
      <View>
        <Image
          source={require('../assets/Images/dart.png')}
          style={styles.Image1}
        />
        <Text style={styles.header}>Get this stuff done</Text>

        {/* ----------------------Finish by end of week--------------------------- */}
        <View>
          <Text style={styles.Heading1}>Finish by end of week</Text>
          <FlatList
            data={todoItems}
            horizontal={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <View style={styles.listConatiner}>
                  <TouchableOpacity style={styles.touchable}>
                    <BouncyCheckbox
                      isChecked={item.completed}
                      fillColor="blue"
                      onPress={() => updatedTodo(item)}
                    />
                    <Text style={styles.title}>{item.title}</Text>
                  </TouchableOpacity>

                  <Text style={styles.description}>{item.description}</Text>

                  <View style={styles.dimensions}>
                    {item.subTasks.map(item => {
                      console.log('SUbtasks', item);
                      return (
                        <React.Fragment key={item.subid}>
                          <View style={styles.listConatiner}>
                            <TouchableOpacity style={styles.touchable}>
                              <BouncyCheckbox
                                isChecked={item.subTaskCompleted}
                                fillColor="blue"
                                unfillColor="#ffffff"
                                onPress={() => subtaskupdatedTodo(item)}
                              />
                              <Text style={styles.title}>
                                {item.subTaskTitle}
                              </Text>
                            </TouchableOpacity>
                            <Text style={styles.description}>
                              {item.subTaskDescription}
                            </Text>
                          </View>
                        </React.Fragment>
                      );
                    })}
                  </View>
                </View>
              );
            }}
            style={styles.flatview}
          />

          {/* ------------------------finish end of day------------------------------ */}
          <Text style={styles.Heading1}>Finish by end of day</Text>

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
                        fillColor="blue"
                        unfillColor="#ffffff"
                        onPress={() => updatedTodo(item)}
                      />
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 16,
                          textDecorationLine: item.completed
                            ? 'line-through'
                            : 'none',
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  )}
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
                   <View style={styles.dimensions}>
                    {item.subTasks.map(item => {
                      return (
                        <React.Fragment key={item.subid}>
                          <View style={{justifyContent: 'space-between'}}>
                            {item.subTaskCompleted && (
                              <TouchableOpacity style={{flexDirection: 'row'}}>
                                <BouncyCheckbox
                                  isChecked={item.subTaskCompleted}
                                  // filterColor="blue"
                                  fillColor="blue"
                                  unfillColor="#ffffff"
                                  onPress={() => subtaskupdatedTodo(item)}
                                />
                                <Text
                                  style={{
                                    color: '#000',
                                    fontSize: 16,
                                    textDecorationLine: item.subTaskCompleted
                                      ? 'line-through'
                                      : 'none',
                                  }}>
                                  {item.subTaskTitle}
                                </Text>
                              </TouchableOpacity>
                            )}

                            {item.subTaskCompleted && (
                              <Text
                                style={{
                                  textDecorationLine: item.subTaskCompleted
                                    ? 'line-through'
                                    : 'none',
                                }}>
                                {item.subTaskDescription}
                              </Text>
                            )}
                          </View>
                        </React.Fragment>
                      );
                    })}
                  </View> 
                </View>
              );
            }}
            extraData={refresh}
            style={styles.flatview}
          />
        </View>
        <View style={styles.actionbtn}>
          <FloatingAction
            onPressMain={() => {
              props.navigation.navigate('AddTodo');
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  Image1: {
    width: 70,
    height: 70,
    marginLeft: 10,
    marginRight: 20,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    top: -40,
  },
  header: {
    color: 'black',
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'left',
    bottom: 30,
    position: 'relative',
    left: 15,
    fontFamily: 'Open Sans',
  },

  Heading1: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    paddingLeft: 15,
  },

  title: {
    color: '#000',
    fontSize: 22,
    width: '90%',
  },

  description: {
    color: '#000',
    fontSize: 16,
    marginLeft: 26,
  },

  dimensions: {
    height: deviceHeight * 0.2,
    marginLeft: 33,
  },
  listConatiner: {
    justifyContent: 'space-between',
  },
  touchable: {
    flexDirection: 'row',
  },
  flatview: {
    height: deviceHeight * 0.2,
    backgroundColor: '#ffffff',
    padding: 10,
    fontSize: 22,
    width: '100%',
    marginTop: 15,
    color: '#000',
    borderRadius: 10,
  },
  actionbtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
