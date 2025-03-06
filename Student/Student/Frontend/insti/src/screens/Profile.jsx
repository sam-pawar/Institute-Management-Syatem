import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useUser } from '../../services/UserContext';

//`http://192.168.135.37:4444/uploads/Student_Photo/${photoImageName}`
// https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8fHww
const ProfileScreen = (props) => {
  const { stdId, stdName, email, courseId, address, birthDate, photoImageName} = useUser();  // Accessing the user from the context
  const [error, setError] = useState(null); // For handling any errors that may occur
  
  // If the user is not available, show a message (e.g., not logged in)
  if (!stdId || !email) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not logged in!</Text>
      </View>
    );
  }

  

  return (
    <ScrollView style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: photoImageName }} 
          style={styles.profilePicture}
        />
      </View>

      {/* User Information */}
      <View style={styles.infoContainer}>
        {/* Name */}
        <Text style={styles.ti}> Student Id</Text>
        <View style={styles.infoRow}>
        <TextInput 
          style={styles.infoText} 
          value={`${stdId}` || "No Id"} 
          editable={false} 
        />
        </View>
        <Text style={styles.ti}>Student Name</Text>
        <View style={styles.infoRow}>
          
          <TextInput style={styles.infoText} value={stdName || 'No Name'} editable={false} />
        </View>
        <Text style={styles.ti}>Student Email</Text>
        {/* Email */}
        <View style={styles.infoRow}>
          <TextInput style={styles.infoText} value={email || 'No Email'} editable={false} />
        </View>
`<Text style={styles.ti} >Course Id</Text>
        {/* Mobile */}
        <View style={styles.infoRow}>
          <TextInput style={styles.infoText} value={`${courseId}` || 'No CourseId'} editable={false} />
        </View>
        <Text style={styles.ti}>Address</Text>
        <View style={styles.infoRow}>
          <TextInput style={styles.infoText} value={address || 'No address'} editable={false} />
        </View>
        <Text style={styles.ti}>Date of Birth</Text>
        <View style={styles.infoRow}>
          <TextInput style={styles.infoText} value={birthDate || 'No birthDate'} editable={false} />
        </View>

      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#3c99ff',
  },
  infoContainer: {
    marginVertical: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  editButton: {
    fontSize: 16,
    color: '#007BFF',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  ti:{
    color: '#9629f0'


  }
});

export default ProfileScreen;
