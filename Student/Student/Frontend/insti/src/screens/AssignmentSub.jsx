import React, { useState, useEffect } from "react";
import { View, Text, Button,TouchableOpacity, ActivityIndicator, Alert, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { useUser } from "../../services/UserContext";
import * as DocumentPicker from "expo-document-picker";  // Add DocumentPicker

function AssignmentList() {
  const { stdId, stdName } = useUser();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);  // Store selected file

  // Function to fetch assignments based on studentId
  const fetchAssignments = async () => {
    setLoading(true);
    setError(null); // Clear previous errors if any

    try {
      const response = await axios.get(`http://192.168.108.37:4444/student/assignments/${stdId}`);
      
      // Check if there are assignments returned
      if (response.data.status === "success") {
        setAssignments(response.data.data);
      } else {
        setError("No assignments found for this student.");
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setError("Failed to fetch assignments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Use Effect hook to fetch data when the component is mounted
  useEffect(() => {
    fetchAssignments();
  }, [stdId]);

  // Function to pick a document
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",  // Accept any type of document
      });

      if (result.type === "cancel") {
        console.log("User canceled document picker");
        return;
      }

      // Save the selected file
      setSelectedFile(result);
      console.log("Selected file:", result);
    } catch (err) {
      console.error("Error picking document:", err);
      Alert.alert("Error", "An error occurred while selecting the file.");
    }
  };

  // Function to upload the document
  const uploadDocument = async () => {
    if (!selectedFile) {
      Alert.alert("No File Selected", "Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: selectedFile.uri,
      name: selectedFile.name,
      type: selectedFile.mimeType || "application/octet-stream",
    });

    try {
      setLoading(true);
      const response = await axios.post("http://192.168.108.37:4444/admin/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("File uploaded successfully:", response.data);
      Alert.alert("Success", "File uploaded successfully.");
      setSelectedFile(null); // Reset file after upload
    } catch (error) {
      //console.error("Upload Error:", error);
     // Alert.alert("Upload Failed", "There was an issue uploading the file.");
    } finally {
      setLoading(false);
    }
  };

  // Render Assignment List
  const renderItem = ({ item }) => (
    <View style={styles.assignmentContainer}>
      <Text style={styles.assignmentTitle}>{item.assignName}</Text>
      <Text>{item.assignDesc}</Text>
      <Text>Publish Date: {item.publishDate}</Text>
      <Text>Due Date: {item.dueDate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assignments for {stdName}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={assignments}
          renderItem={renderItem}
          keyExtractor={(item) => item.assignId.toString()}
        />
      )}

        <TouchableOpacity style={styles.button} onPress={pickDocument}>
               <Text style={styles.buttonText}>Pick Document</Text>
             </TouchableOpacity>


             <TouchableOpacity style={styles.button} onPress={uploadDocument}>
               <Text style={styles.buttonText}>{loading ? "Uploading..." : "Upload PDF"}</Text>
             </TouchableOpacity>


    
             <TouchableOpacity style={styles.button} onPress={fetchAssignments}>
               <Text style={styles.buttonText}>Refresh</Text>
             </TouchableOpacity>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  assignmentContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#e1e1e1",
    borderRadius: 5,
    width: "100%",
  },
  assignmentTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
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

export default AssignmentList;
