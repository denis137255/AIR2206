import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';

import LoginScreen from './src/screens/Auth/Login/LoginScreen';
import Menu from './src/screens/MainMenu/Menu';
import AddClubScreen from './src/screens/Club/AddClubScreen'
import AddFloorScreen from './src/screens/Club/AddFloorScreen';

import {User, onAuthStateChanged} from 'firebase/auth';
import { FIREBASE_AUTH } from './src/firebase/FirebaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

//TODO Treba odvojen screen za ovu navigaciju napraviti
//Obican user layout
//Privremeno dodan AddClub, on ce ici u stack ispod
function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Menu" component={Menu} />
      <InsideStack.Screen name="AddClub" component={AddClubScreen} />
      <InsideStack.Screen name="AddFloor" component={AddFloorScreen} />
    </InsideStack.Navigator>
  );
}
//TODO Ispod treba napravit drugi layout za admina

export default function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) =>{
      setUser(user);
    })

  })

  return (

    //Provjeri stanje prijave, pa ga posalje u app
    //TODO Kasnije treba poslije provjere provjeriti tip korisnika i poslati ga u pravom smjeru
    //TODO sugeriram switchcase (jer nam treba i superadmin ovdje)


    //TODO Poslati ga na WelcomeScreen, ne login 

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (<Stack.Screen 
         name= "Inside" 
         component={InsideLayout} 
         options={{ headerShown: false }} />
         ) : (
         <Stack.Screen 
         name= "Login" 
         component={LoginScreen} 
         options={{headerShown: false}}/>)}
        
         
      </Stack.Navigator>
    </NavigationContainer>
  );
}

