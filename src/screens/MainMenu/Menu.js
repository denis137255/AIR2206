import { View, Text, Button } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../firebase/FirebaseConfig'
import { createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../Auth/Login/LoginScreen';


const Menu = ({navigation}) => {
    
    const handleNavigateToAddClub = () => {
    navigation.navigate('AddClub'); // Navigate to the 'AddClub' screen
      };

  return (
    <View>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title ="Logout" />
      <Button onPress={handleNavigateToAddClub} title="Add Club" />

    </View>
  )
}

export default Menu