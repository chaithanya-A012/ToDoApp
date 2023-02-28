import {StyleSheet, SafeAreaView, TextInput, Text, TouchableOpacity} from 'react-native';
import {useState} from 'react';


const LoginScreen = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  console.log('this is props', props);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Notion!</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        keyboardType="visible-password"
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity
        title="LOGIN"
        onPress={() => {
          console.log('cliked login');
          props.navigation.navigate('HomeScreen');
        }}><Text style={styles.Btn}>LOGIN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#52514d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    color: '#ffffff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    width: '80%',
    marginTop: 15,
    color: '#000',
    borderRadius: 10,
  },
  Btn: {
    color: 'white',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 10,
    marginTop:10,
    padding: 10,
  },
});

export default LoginScreen;
