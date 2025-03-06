import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import { useUser } from '../../services/UserContext';
import axios from 'axios';

const CheckAttenence = () => {
  const [notices, setNotices] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);  // Store the attendance percentage
  const [animationProgress] = useState(new Animated.Value(0));  // Animated value for the bar width
  const { stdId,stdName } = useUser();

  useEffect(() => {
    // Fetch attendance data from backend
    axios.get(`http://192.168.108.37:4444/student/attendance?stdId=${stdId}`).then((result) => {
      console.log(result.data.data);
      setNotices(result.data.data);

      // Get the attendance percentage from the first item (or your specific logic)
      const percentage = result.data.data[0]?.attendancePercentage || 0;
      setAttendancePercentage(percentage);

      // Animate the progress bar
      Animated.timing(animationProgress, {
        toValue: percentage / 100,  // Convert the percentage to a value between 0 and 1
        duration: 1000,
        useNativeDriver: false,
      }).start();
    });
  }, [stdId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{stdName} Attendance</Text>

      {/* Attendance Percentage */}
      <Text style={styles.detailsTitle}>Attendance Percentage:</Text>
      
      {/* Animated Progress Bar */}
      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[
            styles.progressBar,
            { width: animationProgress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              }),
            },
          ]}
        />
      </View>

      <Text style={styles.percentageText}>
        {attendancePercentage}%  {/* Display the current percentage */}
      </Text>

      {/* List of attendance details */}
      
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
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  notificationCard: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: 16,
  },
  progressBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginTop: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#9629f0',
    borderRadius: 5,
  },
  percentageText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default CheckAttenence;
