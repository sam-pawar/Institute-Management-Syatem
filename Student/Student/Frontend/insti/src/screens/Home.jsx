import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './Profile';
import SettingsScreen from './FeePayment';
import bg from '../../assets/login.jpg';

const HomeScreen = ({ navigation }) => {
  const [mobiles, setMobiles] = useState([]);

  //useEffect(() => {
   // axios
   //   .get('http://10.0.2.2:4444/user/mobiles')
   //   .then((response) => {
    //    if (response.data.status === 'success') {
  //        setMobiles(response.data.data);
   //     }
   //   })
   //   .catch((error) => console.error(error));
  //}, []);

  const imageData = [
    {
      id: '1',
      title: 'College Campus',
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: '2',
      title: 'Placement',
      imageUrl: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: '3',
      title: 'college Library',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: '4',
      title: 'college Auditorium',
      imageUrl: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXVkaXRvcml1bXxlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: '5',
      title: 'sports ',
      imageUrl: 'https://images.unsplash.com/photo-1618548723848-1b339b8a7999?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhZG1pbnRvbiUyMGNvdXJ0fGVufDB8fDB8fHww',
    },
    {
      id: '6',
      title: 'Smart Classroom',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1691873264445-c987c16a3ba9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHNtYXJ0JTIwJTIwY2xhc3Nyb29tfGVufDB8fDB8fHww',
    },
  ];

  return (
    <View style={styles.container}>
    <FlatList
      data={imageData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <Text style={styles.caption}>{item.title}</Text>
        </View>
      )}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  caption: {
    padding: 10,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  card: {
    flexBasis: '48%',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    padding:90
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  details: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default HomeScreen;
