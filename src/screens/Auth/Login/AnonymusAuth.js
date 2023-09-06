import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { signInAnonymously } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../firebase/FirebaseConfig';
import { INTRO_BUTTON, PRIMARY_COLOR} from '../../../utils/StyleUtils';

const AnonymousSignInButton = () => {
  const handleAnonymousSignIn = async () => {
    try {
    await signInAnonymously(FIREBASE_AUTH);
    } catch (error) {
      console.error('Error during anonymous authentication:', error);
    }
  };

  return (
    <View style={INTRO_BUTTON}>
      <Button title="Join as Guest" onPress={handleAnonymousSignIn} color={PRIMARY_COLOR} />
    </View>
  );
};

export default AnonymousSignInButton;
