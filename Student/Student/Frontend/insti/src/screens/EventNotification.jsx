import axios from 'axios';
import React, {useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Button } from 'react-native';

const EventNotification = () => {
  const [notices, setNotices] = useState([]);
 
  useEffect(()=>{
      axios.get(`http://192.168.108.37:4444/student/notice`).then((result)=>{
          console.log(result.data.data);
          setNotices(result.data.data);
      })
  },[])

  return (
    <View style={styles.container}>
    
    <FlatList
      data={notices}
      keyExtractor={(item) => item.noticeId.toString()} // Assuming "id" field exists
      renderItem={({ item }) => <Text style={styles.notificationCard}>{item.noticeText}</Text>} // Assuming "title" field exists
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  notificationCard: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    shadowColor: '#f20505',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize:16
  },
  notificationMessage: {
    fontSize: 16,
    color: '#333',
  },
});

export default EventNotification;
