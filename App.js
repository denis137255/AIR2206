import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import FirstScreen from './src/screens/Auth/FirstScreen'

import * as Font from 'expo-font'; // Import the Font module

import UserMenu from './src/screens/MainMenu/UserMenu';
import UserClubScreen from './src/screens/Club/UserClubScreen';

import Menu from './src/screens/MainMenu/Menu';
import AddClubScreen from './src/screens/Club/AddClubScreen';
import AddFloorScreen from './src/screens/Club/AddFloorScreen';
import MyClubScreen from './src/screens/Club/MyClubScreen';
import EditClubScreen from './src/screens/Club/EditClub';

import {User, onAuthStateChanged} from 'firebase/auth';
import { FIREBASE_AUTH } from './src/firebase/FirebaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

const UserStack = createNativeStackNavigator();


//TODO Treba odvojen screen za ovu navigaciju napraviti
//Obican user layout
//Privremeno dodan AddClub, on ce ici u stack ispod

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
function UserLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="UserMenu" component={UserMenu} options={{ headerShown: false }}  />
      <InsideStack.Screen name="AddClub" component={AddClubScreen} options={{ headerShown: false }} />
      <InsideStack.Screen name="AddFloor" component={AddFloorScreen} options={{ headerShown: false }}/>
      <InsideStack.Screen name="UserClubScreen" component={UserClubScreen} options={{ headerShown: false }} />
      <InsideStack.Screen name="EditClub" component={EditClubScreen} options={{ headerShown: false }} />
    </InsideStack.Navigator>
  );
}
//TODO Ispod treba napravit drugi layout za korisnika

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [user, setUser] = useState(null);


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
    onAuthStateChanged(FIREBASE_AUTH, (user) =>{
      setUser(user);
    })

  })

  if (!dataLoaded) {
    // Wait for fonts to be loaded before rendering the app
    return null;
  }

  return (

    //Provjeri stanje prijave, pa ga posalje u app
    //TODO Kasnije treba poslije provjere provjeriti tip korisnika i poslati ga u pravom smjeru

    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen">
        {user ? (<Stack.Screen 
         name= "Inside" 
         component={UserLayout} 
         options={{ headerShown: false }} />
         ) : (
         <Stack.Screen 
         name= "FirstScreen" 
         component={FirstScreen} 
         options={{headerShown: false}}/>)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

