import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserProvider, useUser } from './services/UserContext'; // Import the useUser hook

// Import your screen components
import HomeScreen from './src/screens/Home';
import CourseRegistration from './src/screens/CourseRegistration';
import ProfileScreen from './src/screens/Profile';
import CheckAttenence from './src/screens/CheckAttenence';
import StudyMaterial from './src/screens/StudyMaterial';
import AssignmentSub from './src/screens/AssignmentSub';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import EventNotification from './src/screens/EventNotification';
import { CartProvider } from './services/CartProvider';
import FeePayment from './src/screens/FeePayment';
import Bot from './src/screens/Bot';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator({ navigation }) {
  const { logout } = useUser(); // Access the logout function from the context

  const handleLogout = () => {
    logout(); // Perform logout action (clear user data)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Navigate to Login screen after logout
    });
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#870ff7' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => <Ionicons name="home" size={22} color='#870ff7' />,
         
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="person-circle" size={22} color='#870ff7' />,
        }}
      />
      <Drawer.Screen 
        name="Study Material"  // Add the Orders screen to the Drawer
        component={StudyMaterial} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="list" size={22} color='#870ff7' />,
        }}
      />
      <Drawer.Screen 
        name="Event and Notification"  // Add the Orders screen to the Drawer <ion-icon name="notifications-outline"></ion-icon>
        component={EventNotification} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="notifications-outline" size={22} color='#870ff7' />,
        }}
      />
       <Drawer.Screen 
        name="Check Attendence"  // Add the Orders screen to the Drawer <ion-icon name="checkmark-circle-outline"></ion-icon>
        component={CheckAttenence} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="checkmark-circle-outline" size={22} color='#870ff7' />,
        }}
      />
       <Drawer.Screen 
        name="Course Registration"  // Add the Orders screen to the Drawer <ion-icon name="clipboard-outline"></ion-icon>
        component={CourseRegistration} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="clipboard-outline" size={22} color='#870ff7' />,
        }}
      />

<Drawer.Screen 
        name="Fee Recipt"  // Add the Orders screen to the Drawer <ion-icon name="cash-outline"></ion-icon>
        component={FeePayment} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="cash-outline" size={22} color='#870ff7' />,
        }}
      />

<Drawer.Screen 
        name="Assignment Submission"  // Add the Orders screen to the Drawer <ion-icon name="share-outline"></ion-icon>
        component={AssignmentSub} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="share-outline" size={22} color='#870ff7' />,
        }}
      />


<Drawer.Screen 
        name="Chat-Bot"  // <ion-icon name="logo-wechat"></ion-icon>
        component={Bot} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="logo-wechat" size={22} color='#870ff7' />,
        }}
      />





      

      <Drawer.Screen 
        name="Logout"
        component={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="log-out" size={22} color='#870ff7' />,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <UserProvider>
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="MobileStore" 
            component={DrawerNavigator} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Cart" 
            component={CheckAttenence} 
            options={{
              title: 'Cart',
              headerStyle: { backgroundColor: '#3c99ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            }}
          />
          <Stack.Screen 
            name="Details" 
            component={CourseRegistration} 
            options={{
              title: 'Product Details',
              headerStyle: { backgroundColor: '#3c99ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            }}
          />
          <Stack.Screen 
            name="Checkout" 
            component={StudyMaterial} 
            options={{
              title: 'Checkout',
              headerStyle: { backgroundColor: '#3c99ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            }}
          />
          <Stack.Screen 
            name="ThankYou" 
            component={AssignmentSub} 
            options={{
              title: '',
              headerStyle: { backgroundColor: '#3c99ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  cartButton: {
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  cartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
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
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
