import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'; // Import expo-sharing to share the file

// Data for subjects
const subjects = [
  { id: '1', name: 'Subject Information', pdfUrl: 'http://192.168.108.37:4444/download/java.pdf' },
  { id: '2', name: 'Paper Pattern', pdfUrl: 'http://192.168.108.37:4444/download/os.pdf' },
  { id: '3', name: 'Notes', pdfUrl: 'http://192.168.108.37:4444/download/dsa.pdf' },
];

const StudyMaterial = () => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadUri, setDownloadUri] = useState(null);
  const [loading, setLoading] = useState(false);

  // Callback to track download progress
  const callback = (downloadProgress) => {
    const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

  // Start downloading PDF
  const startDownload = async (pdfUrl) => {
    setLoading(true);
    try {
      const fileUri = FileSystem.documentDirectory + 'downloaded_File.pdf'; // Save the file in the app's document directory
      const downloadObj = FileSystem.createDownloadResumable(pdfUrl, fileUri, {}, callback);

      const { uri } = await downloadObj.downloadAsync();
      setDownloadUri(uri);
      setLoading(false);
      Alert.alert('Download complete', `File downloaded to ${uri}`);

      // Open the downloaded PDF with the default PDF viewer
      openPDF(uri);
    } catch (e) {
      console.error('Download failed:', e);
      setLoading(false);
      Alert.alert('Download failed', 'There was an error downloading the PDF');
    }
  };

  // Function to open the PDF in the default PDF viewer app
  const openPDF = async (uri) => {
    try {
      const isAvailable = await Sharing.isAvailableAsync(); // Check if sharing is available
      if (isAvailable) {
        await Sharing.shareAsync(uri); // Share the file with the default PDF viewer app
      } else {
        Alert.alert('Error', 'No app available to view the PDF');
      }
    } catch (e) {
      console.error('Error opening PDF:', e);
      Alert.alert('Error', 'Failed to open PDF');
    }
  };

  // Render each subject item
  const renderSubjectItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.subjectName}>{item.name}</Text>

        {/* Download PDF Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => startDownload(item.pdfUrl)}
        >
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        renderItem={renderSubjectItem}
      />

      {loading && (
        <View style={styles.progressContainer}>
          <ActivityIndicator size="large" color="#9629f0" />
          <Text style={styles.progressText}>Downloading...</Text>
        </View>
      )}

      {/* Progress Bar */}
      {!loading && downloadProgress > 0 && downloadProgress < 1 && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Download Progress: {(downloadProgress * 100).toFixed(2)}%</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#9629f0',
    height: 50,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    padding: 16,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default StudyMaterial;
