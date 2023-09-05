import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import GoogleSignInComponent from './signInGoogle'; // Import your Google Sign-In component
import EmailPasswordSignIn from './signInEmail';
import AnonymousSignInButton from './AnonymusAuth';
import { CENTERED_CONTAINER, SPACING_LARGE, TEXT_COLOR } from '../../../utils/StyleUtils';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      
      <View>
      <EmailPasswordSignIn />
      </View>
      
      <View>
      <GoogleSignInComponent />
      </View>

      <Text style={{color: TEXT_COLOR}}>OR</Text>

      <View>
      <AnonymousSignInButton/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CENTERED_CONTAINER,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING_LARGE,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  orText: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
});

export default LoginScreen;
