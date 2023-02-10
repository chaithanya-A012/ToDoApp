import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';

const Addnotes = props => {
  const initialState = {
    id: 0,
    title: '',
    description: '',
    completed: false,
    subTasks: [],
  };
  console.log('this is data from homescreen', props.route.params);

  const [newTodo, setNewTodo] = useState(initialState);
  const [inputs, setInputs] = useState([]);

  const [inputsData, setInputsData] = useState({
    subid: 0,
    subTaskTitle: '',
    subTaskDescription: '',
    subTaskCompleted: false,
  });

  const [inputField, setInputField] = useState(false);

  const handleChange = (title, value) => {
    setNewTodo({...newTodo, [title]: value});
  };

  const addHandler = (title, value) => {
    setInputsData({...inputsData, [title]: value});

    // let res = {...newTodo, subTasks:[{
    //   subTaskTitle: title === 'subTaskTitle' ? value : null,
    //   subTaskDescription: title === 'subTaskDescription' ? value : null,
    // }]};
  };

  return (
    <ScrollView>
      <View style={{marginHorizontal: 20}}>
        <View>
          <Text
            style={{
              marginVertical: 20,
              color: '#000',
              fontWeight: 'bold',
              fontSize: 25,
            }}>
            Add Todo tasks
          </Text>

          {/* -----------------------------DoneButton---------------------------------  */}

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('DoneScreen', {
                data: newTodo,
                newdata: inputsData,
              });
            }}
            style={{
              backgroundColor: 'blue',
              width: 100,
              borderRadius: 20,
              alignItems: 'center',
              padding: 10,
              marginLeft: 100,
              position: 'absolute',
              right: 6,
              marginTop: 10,
            }}>
            <Text style={{color: '#fff', fontSize: 19}}>Done</Text>
          </TouchableOpacity>
          {/* ----------------------------------------------------------------------------------- */}

          {/* ------------------------for adding main task--------------------*/}
          <TextInput
            placeholder="Title"
            value={newTodo.title}
            onChangeText={title => handleChange('title', title)}
            style={{
              backgroundColor: 'rgb(220,220,220)',
              borderRadius: 10,
              paddingHorizontal: 10,
              marginVertical: 10,
            }}
          />
          <TextInput
            placeholder="Description"
            value={newTodo.description}
            onChangeText={desc => handleChange('description', desc)}
            style={{
              backgroundColor: 'rgb(220,220,220)',
              borderRadius: 10,
              paddingHorizontal: 10,
              marginVertical: 10,
            }}
            multiline={true}
            numberOfLines={6}
          />
        </View>

        {/* -------------------------for adding sub task --------------------------------------------------------------*/}

        <View>
          <Text
            style={{
              marginVertical: 20,
              color: '#000',
              fontWeight: 'bold',
              fontSize: 25,
            }}>
            Add sub tasks
          </Text>
          {/*-----------(+)Button for adding sub task--------------------------- */}
          <TouchableOpacity
            onPress={() => {
              setInputField(!inputField);
            }}
            style={{
              backgroundColor: 'blue',
              width: 50,
              borderRadius: 50,
              alignItems: 'center',
              padding: 10,
            }}>
            <Text style={{color: '#fff', fontSize: 19, borderRadius: 50}}>
              +
            </Text>
          </TouchableOpacity>
          {inputField ? (
            <View>
              <TextInput
                placeholder="Title"
                value={inputs.subTaskTitle}
                onChangeText={title => addHandler('subTaskTitle', title)}
                style={{
                  backgroundColor: 'rgb(220,220,220)',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  marginVertical: 10,
                }}
              />
              <TextInput
                placeholder="Description"
                value={inputs.subTaskDescription}
                onChangeText={desc => addHandler('subTaskDescription', desc)}
                style={{
                  backgroundColor: 'rgb(220,220,220)',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  marginVertical: 10,
                }}
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
              let data = [...inputs, inputs.push(inputsData)];
              setInputs(data);
              console.log('SubTask details ', inputsData);

              let res = {...newTodo, subTasks: [inputsData]};
              setNewTodo(res);
              console.log('Updated NewTodo ', res);

              DeviceEventEmitter.emit('got-data', res);
            }}
            style={{
              backgroundColor: 'blue',
              width: 100,
              borderRadius: 10,
              alignItems: 'center',
              padding: 10,
            }}>
            <Text style={{color: '#fff', fontSize: 19}}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Addnotes;
