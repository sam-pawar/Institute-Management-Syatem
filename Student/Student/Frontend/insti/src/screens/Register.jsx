import React, { useState } from 'react';
import { View, Text,Button, TextInput, TouchableOpacity, StyleSheet, Alert,ImageBackground } from 'react-native';
import axios from 'axios';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import reg from '../../assets/register.jpg';








const RegisterScreen = ({ navigation }) => { // Accept navigation prop
  const [stdName, setstdName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [courseId, setcourseId] = useState('');
  const [address, setaddress] = useState('');
  const [birthDate, setbirthDate] = useState('');
  const [gender, setgender] = useState('');
  const photoImageName=null






  const handleRegister = () => {
    if (!stdName || !email || !password || !courseId || !address ||  !birthDate || !gender) {
      return Alert.alert('Error', 'All fields are required!');
    }

    axios 
      .post('http://192.168.108.37:4444/student/registration', {
        stdName,
        email,
        password,
        courseId,
        address,
        birthDate,
        gender,
        photoImageName



      })
      .then((response) => {
        console.log(response.data);
        Alert.alert('Success', 'User registered successfully!');
        navigation.replace('Login');
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message || 'Registration failed!';
        console.error('Error registering user:', errorMessage);
        Alert.alert('Error', errorMessage);
      });
  };
  

  return (
    <SafeAreaProvider>
    <SafeAreaView >

      <ImageBackground source={reg} resizeMode="cover" style={styles.image} >
    
      <Text style={styles.login}>Register Here</Text>

      <TextInput
        style={styles.email}
        placeholder="Full Name"
        value={stdName}
        onChangeText={setstdName}
      />
      <TextInput
        style={styles.email}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.email}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.email}
        placeholder="Course Id"
        keyboardType="numeric"
        value={courseId}
        onChangeText={setcourseId}
      />

      <TextInput
        style={styles.email}
        placeholder="Address"
        
        value={address}
        onChangeText={setaddress}
      />

     <TextInput
        style={styles.email}
        placeholder="Birth Date"
        keyboardType="numeric"
        value={birthDate}
        onChangeText={setbirthDate}
      />

<TextInput
        style={styles.email}
        placeholder="Gender"
        
        value={gender}
        onChangeText={setgender}
      />


      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={ styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    
    </ImageBackground>

</SafeAreaView>
</SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  login: {

    fontSize: 38,
    marginBottom: 20,
    color: '#9629f0'
  },
  email: {

    height: 48,
    width: 250,
    margin: 10,
    borderWidth: 2,
    padding: 5,
    backgroundColor:"#dcdcde",
    borderColor: '#9629f0',
    textAlign: "center",
    color: '#9629f0',
    fontSize: 22,
    borderRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
    drop:{
    color: '#9629f0'
    
},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  button: {

    backgroundColor: '#9629f0',

    height: 50,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    fontSize: 20,
    textAlignVertical: 'center',
    margin: 12,

    borderRadius: 30

  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#ddd',
  },
  secondaryButtonText: {
    color: '#333',
  },
  image: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
});

export default RegisterScreen;
