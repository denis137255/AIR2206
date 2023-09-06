import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH } from '../../../firebase/FirebaseConfig';
import { INTRO_BUTTON, INTRO_CONTAINER, PRIMARY_COLOR} from '../../../utils/StyleUtils';

const GoogleSignInComponent = () => {
  const [userInfo, setUserInfo] = useState();
  WebBrowser.maybeCompleteAuthSession();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '745815725341-td3j0jss8gu5qjm4bksduonlfjgd8mrs.apps.googleusercontent.com',
    webClientId: '873612396167-ohkcksb2scacoqgq85s1anl4h45ul9pi.apps.googleusercontent.com',

  });

  const handleSignInWithGoogle = async () => {
    promptAsync();
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, credential);
    }
  }, [response]);

  return (
    <View style={INTRO_BUTTON}>
      <Button title="Sign In with Google" onPress={handleSignInWithGoogle} color={PRIMARY_COLOR} />
    </View>
  );
};

export default GoogleSignInComponent;
