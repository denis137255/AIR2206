import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import GoogleSignInComponent from './signInGoogle'; // Import your Google Sign-In component
import EmailPasswordSignIn from './signInEmail';
import AnonymousSignInButton from './AnonymusAuth';
import { CENTERED_CONTAINER, INTRO_CONTAINER, SPACING_LARGE, TEXT_COLOR } from '../../../utils/StyleUtils';

const LoginScreen = () => {
  return (      
      <View style={CENTERED_CONTAINER}>
      <EmailPasswordSignIn />
      <GoogleSignInComponent/>

      <Text style={{color: TEXT_COLOR}}>OR</Text>

      <AnonymousSignInButton/>
      </View>
  );
};

export default LoginScreen;
