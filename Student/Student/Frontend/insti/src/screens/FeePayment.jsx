import axios from "axios";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Card, Text, Title, Badge } from "react-native-paper";

function FeePayment() {
    const [stdId, setStdId] = useState(1);
    const [loading, setLoading] = useState(true);
    const [receipt, setReceipt] = useState({
        trnxNo: 0,
        trnxCompleteDate: "",
        initialDate: "",
        amount: 0,
        status: "",
    });

    useEffect(() => {
        axios.get(`http://192.168.108.37:4444/student/paymentdetails/${stdId}`)
            .then((result) => {
                if (result.data) {
                    console.log(result.data);
                    setReceipt(result.data.data);
                }
            })
            .catch(error => console.error("Error fetching data:", error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={styles.container}>
            <Title style={styles.title}>📜 Fee Receipt</Title>
            {loading ? (
                <ActivityIndicator size="large" color="#6200ea" />
            ) : (
                <Card style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.receiptTitle}>Transaction Details</Text>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.row}>
                            <Text style={styles.label}>🎓 Student ID:</Text>
                            <Text style={styles.value}>{stdId}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>📌 Transaction No:</Text>
                            <Text style={styles.value}>{receipt.trnxNo}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>📅 Initial Date:</Text>
                            <Text style={styles.value}>{receipt.initialDate}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>💳 Transaction Date:</Text>
                            <Text style={styles.value}>{receipt.trnxCompleteDate}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>💰 Amount Paid:</Text>
                            <Text style={[styles.value, styles.amount]}>₹{receipt.amount}</Text>
                        </View>

                        <View style={styles.statusContainer}>
                            <Text style={styles.label}>📍 Status:</Text>
                            <Badge style={receipt.status === "Completed" ? styles.completed : styles.pending}>
                                {receipt.status}
                            </Badge>
                        </View>
                    </View>
                </Card>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fce6fb", // Light blue gradient background
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#6200ea", // Primary theme color
    },
    card: {
        width: "100%",
        maxWidth: 400,
        borderRadius: 15,
        backgroundColor: "#ffffff",
        padding: 20,
        shadowColor: "#6200ea",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingBottom: 10,
        marginBottom: 15,
    },
    receiptTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
    },
    content: {
        padding: 5,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
    },
    value: {
        fontSize: 12,
        color: "#222",
        fontWeight: "500",
    },
    amount: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#007BFF",
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 5,
    },
    completed: {
        backgroundColor: "#4CAF50",
        color: "white",
        paddingHorizontal: 10,
        
        fontSize: 14,
    },
    pending: {
        backgroundColor: "#E53935",
        color: "white",
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 14,
    },
});

export default FeePayment;