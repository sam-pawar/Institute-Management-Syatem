import React from 'react';
import { View, Text,TouchableOpacity, Button, Linking, StyleSheet } from 'react-native';

const Bot = () => {
  // Function to handle URL opening in browser
  const handleOpenLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stay connected, never miss an Notification! Join our social media notification bot today</Text>
      <Text style={styles.subtitle}> </Text>
      
     

       <TouchableOpacity style={styles.button} onPress={() => handleOpenLink('https://t.me/Sunbeam_DMC_bot')}>
              <Text style={styles.buttonText}>Join Bot</Text>
            </TouchableOpacity>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
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

export default Bot;
