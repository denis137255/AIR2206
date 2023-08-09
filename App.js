import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './src/screens/Auth/Login/LoginScreen';

const Stack = createNativeStackNavigator();

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

