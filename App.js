import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import FirstScreen from './src/screens/Auth/FirstScreen'

import * as Font from 'expo-font'; // Import the Font module
import StyleUtils from './src/utils/StyleUtils';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 icons


import UserMenu from './src/screens/MainMenu/UserMenu';
import UserSettings from './src/screens/Settings/UserSettings';
import UserClubScreen from './src/screens/Club/UserClubScreen';

import Menu from './src/screens/MainMenu/Menu';
import AddClubScreen from './src/screens/Club/AddClubScreen';
import AddFloorScreen from './src/screens/Club/AddFloorScreen';
import MyClubScreen from './src/screens/Club/MyClubScreen';
import EditClubScreen from './src/screens/Club/EditClub';

import {User, onAuthStateChanged} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_INSTANCE } from './src/firebase/FirebaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

const UserStack = createNativeStackNavigator();
const UserTab = createBottomTabNavigator();




function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Menu" component={Menu} options={{ headerShown: false }}  />
      <InsideStack.Screen name="AddClub" component={AddClubScreen} options={{ headerShown: false }} />
      <InsideStack.Screen name="AddFloor" component={AddFloorScreen} options={{ headerShown: false }}/>
      <InsideStack.Screen name="MyClub" component={MyClubScreen} options={{ headerShown: false }} />
      <InsideStack.Screen name="EditClub" component={EditClubScreen} options={{ headerShown: false }} />
    </InsideStack.Navigator>
  );
}

function UserStackNavigator() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="UserMenu"
        component={UserMenu}
        options={{ headerShown: false }}
      />
      <UserStack.Screen
        name="UserClubScreen"
        component={UserClubScreen}
        options={{ headerShown: false }}
      />
    </UserStack.Navigator>
  );
}

function UserLayout() {
  return (
    <UserTab.Navigator
      screenOptions={{
        tabBarLabelActiveTintColor: StyleUtils.PRIMARY_COLOR,
        tabBarInactiveTintColor: StyleUtils.TEXT_COLOR,
        tabBarStyle: [
          {
            backgroundColor: StyleUtils.SECONDARY_COLOR,
          },
        ],
      }}
    >
      <UserTab.Screen
        name="UserMenuScreen"
        component={UserStackNavigator}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="bars" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
      <UserTab.Screen
        name="UserSettings"
        component={UserSettings}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
    </UserTab.Navigator>
  );
}

//TODO Ispod treba napravit drugi layout za korisnika

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // State to store admin status



  //Provjeri font stanje - obrisano

  useEffect(() => {
    // Load fonts when the component mounts
    const loadFonts = async () => {
      await Font.loadAsync({
        'Roboto-Regular': require('./src/utils/fonts/Roboto-Regular.ttf'),
        'Roboto-Bold': require('./src/utils/fonts/Roboto-Bold.ttf')
        // Load other fonts if needed
      });
      setDataLoaded(true); // Set dataLoaded to true when fonts are loaded
    };

    loadFonts(); // Call the function to load fonts
  }, []); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      console.log('User status', user);
      if (user) {
        console.log('USER EXISTS!');
        const userDocRef = doc(FIRESTORE_INSTANCE, 'user', user.uid);
        getDoc(userDocRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              console.log('Snapshot does exist!');
              const userData = docSnapshot.data();
              const userIsAdmin = userData.admin;
              setIsAdmin(userIsAdmin);
              console.log('Admin check:', userIsAdmin);
            } else {
              setIsAdmin(false);
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      } else {
        setIsAdmin(false);
      }
    });
  
    // Return a cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [FIREBASE_AUTH]); // Include FIREBASE_AUTH in the dependencies array
  
  

  if (!dataLoaded) {
    // Wait for fonts to be loaded before rendering the app
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='FirstScreen'>
        {user ? ( isAdmin ? (
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
        ):(
            <Stack.Screen
            name="User"
            component={UserLayout}
            options={{ headerShown: false }}
          />
          )):(
          <Stack.Screen
            name="FirstScreen"
            component={FirstScreen}
            options={{ headerShown: false }}
          />
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

