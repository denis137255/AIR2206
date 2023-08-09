import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import LoginScreen from './src/screens/Auth/Login/LoginScreen';
import Menu from './src/screens/MainMenu/Menu';
import {User, onAuthStateChanged} from 'firebase/auth';
import { FIREBASE_AUTH } from './src/firebase/FirebaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

//dodaj screen za sve
function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Menu" component={Menu} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
        name= "Login" 
        component={LoginScreen} 
        options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

