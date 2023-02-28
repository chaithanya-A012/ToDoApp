import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToDo} from '../features/todoSlice';
const AddTodo = props => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    id: 0,
    title: '',
    description: '',
    completed: false,
    subTasks: [],
  });
  const [subState, setSubState] = useState({
    subid: 0,
    subTaskTitle: '',
    subTaskDescription: '',
    subTaskCompleted: false,
  });

  const [inputField, setInputField] = useState(false);

  const handleChange = (title, value) => {
    setState({...state, [title]: value});
  };

  const addHandler = (title, value) => {
    setSubState({...subState, [title]: value});
  };

  const saveAddedTOdo = () => {
    let res = {...state};
    res.id = Math.random();
    res.subTasks.push(subState);
    setState(res);
    console.log('AFter calling save if substate', state);
    dispatch(addToDo(state));
    console.log('dispatchedData', state);
  };

  const subTaskToggle = () => {
    setInputField(!inputField);
    if (inputField === false) {
      let value = {
        subid: state.subTasks.length + 1,
        subTaskCompleted: false,
        subTaskTitle: '',
        subTaskDescription: '',
      };
      setSubState(value);
      console.log('after creating new object ', subState);
    } else {
      let res = {...state};
      res.subTasks.push(subState);
      setState(res);
      console.log('AFter calling save if substate', state);
    }
  };

  return (
    <ScrollView>
      <View style={styles.maincontainer}>
        <View>
          <Text style={styles.heading1}>Add Todo tasks</Text>

          {/* -----------------------------DoneButton---------------------------------  */}

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ListTodo', {
                data: state,
                newdata: subState,
              });
            }}
            style={styles.touchable}>
            <Text style={styles.text}>Done</Text>
          </TouchableOpacity>
          {/* ----------------------------------------------------------------------------------- */}

          {/* ------------------------for adding main task--------------------*/}
          <TextInput
            placeholder="Title"
            value={state.title}
            onChangeText={title => {
              handleChange('title', title);
            }}
            style={styles.textinput}
          />
          <TextInput
            placeholder="Description"
            value={state.description}
            onChangeText={desc => handleChange('description', desc)}
            style={styles.textinput}
            multiline={true}
            numberOfLines={6}
          />
        </View>

        {/* -------------------------for adding sub task --------------------------------------------------------------*/}

        <View>
          <Text style={styles.heading2}>Add sub tasks</Text>
          {/*-----------(+)Button for adding sub task--------------------------- */}
          <TouchableOpacity
            onPress={() => {
              subTaskToggle();
            }}
            style={styles.touchable1}>
            <Text style={styles.togglebtn}>+</Text>
          </TouchableOpacity>

          {inputField ? (
            <View>
              <TextInput
                placeholder="Title"
                value={subState.subTaskTitle}
                onChangeText={title => {
                  addHandler('subTaskTitle', title);
                }}
                style={styles.textinput}
              />
              <TextInput
                placeholder="Description"
                value={subState.subTaskDescription}
                onChangeText={desc => addHandler('subTaskDescription', desc)}
                style={styles.textinput}
                multiline={true}
                numberOfLines={6}
              />
            </View>
          ) : null}
        </View>

        {/* ------------------------AddButton----------------------------------------------------------*/}

        <View style={{width: '100%', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              saveAddedTOdo();
            }}
            style={styles.addbtn}>
            <Text style={styles.text}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    marginHorizontal: 20,
  },
  heading1: {
    marginVertical: 20,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 25,
  },
  heading2: {
    marginVertical: 20,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 25,
  },
  touchable: {
    backgroundColor: 'blue',
    width: 100,
    borderRadius: 20,
    alignItems: 'center',
    padding: 10,
    marginLeft: 100,
    position: 'absolute',
    right: 6,
    marginTop: 10,
  },
  text: {
    color: '#fff',
    fontSize: 19,
  },
  textinput: {
    backgroundColor: 'rgb(220,220,220)',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  addbtn: {
    backgroundColor: 'blue',
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  togglebtn: {
    color: '#fff',
    fontSize: 19,
    borderRadius: 50,
  },
  touchable1: {
    backgroundColor: 'blue',
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    padding: 10,
  },
});
export default AddTodo;
