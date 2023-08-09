import { View, Text, Button } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../firebase/FirebaseConfig'

const Menu = ({navigation}) => {
  return (
    <View>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title ="Logout" />
    </View>
  )
}

export default Menu