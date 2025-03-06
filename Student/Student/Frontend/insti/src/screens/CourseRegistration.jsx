import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,ImageBackground } from 'react-native';
import axios from 'axios';
import { useUser } from '../../services/UserContext';
import bg from '../../assets/course.jpg';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


const CourseRegistration = ({ navigation }) => {
  

  return (

    <SafeAreaProvider>
    <SafeAreaView>

    <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
   
      


  
    
    
    
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
    height: 60,
    width: 300,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    backgroundColor: '#dcdcde',
    borderColor: '#9629f0',
    borderRadius: 9999,
    textAlign: 'center',
    color: '#9629f0',
    fontSize: 22,
  },
  image: {
    
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
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
    textAlign: 'center',
    fontSize: 20,
    textAlignVertical: 'center',
    margin: 12,

    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CourseRegistration;
