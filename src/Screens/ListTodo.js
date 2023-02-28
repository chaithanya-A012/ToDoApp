import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';

const ListTodo = props => {
  const {todoList} = useSelector(state => state.todo);
  console.log(
    'todo list from slice-listTodo-screen',
    todoList,
    typeof todoList,
  );
  return (
    <FlatList
      data={todoList}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return (
          <View style={styles.maincontainer}>
            <View style={styles.container}>
              <Text style={styles.Title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <View>
                {item.subTasks.map(item => {
                  console.log('subtasks from Todolist screen', item);
                  return (
                    <React.Fragment key={item.subid}>
                    <View style={styles.listConatiner}>
                      <Text style={styles.Title}>{item.subTaskTitle}</Text>
                      <Text style={styles.description}>
                        {item.subTaskDescription}
                      </Text>
                    </View>
                    </React.Fragment>
                  );
                })}
              </View>
              <Text style={styles.description}>
                {item.subTasks.subTaskDescription}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('HomeScreen');
              }}
              style={styles.touch}>
              <Text style={styles.Done}>Done</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'rgb(220,220,220)',
  },
  maincontainer: {
    alignItems: 'center',
    paddingTop: Dimensions.get('window').height / 3,
  },
  Title: {
    fontSize: 30,
    textAlign: 'center',
    padding: 8,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'flex-start',
    padding: 8,
    fontFamily: 'Cochin',
    fontWeight: 'normal',
    color: 'black',
    fontStyle: 'italic',
  },
  Done: {
    color: '#fff',
    fontSize: 19,
    alignItems: 'center',
  },
  touch: {
    backgroundColor: 'blue',
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
});
export default ListTodo;



//   _.map(todoList.todoList,(a,b) =>{
//       console.log('a', (a));
//     })

//     return(
//       {
//         todoList.map()
//       }
//     )
// };

// if(todo.length){
//     return(
//       <View>
//       <Text>todoList</Text>

//      {_.map(JSON.stringify(todo[0].todos),(a,b)=>{
//       return(<Text>{`${b}.${a}`}</Text>)
//      })}
//      </View>
//     );
//   }

//
