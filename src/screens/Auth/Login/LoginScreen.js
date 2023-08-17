import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, Image, ScrollView } from 'react-native';
import { FIREBASE_AUTH } from '../../../firebase/FirebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import StyleUtils, { SPACING_MEDIUM, BUTTON_STYLE, TEXT_INPUT_STYLE } from '../../../utils/StyleUtils';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.navigate('Inside');
        }
      });
    } catch (error) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../../assets/new_logo.png')} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
            value={email}
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={StyleUtils.TEXT_COLOR}
            color={StyleUtils.TEXT_COLOR}
          />
          <TextInput
            value={password}
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor={StyleUtils.TEXT_COLOR}
            color={StyleUtils.TEXT_COLOR}
          />
      </View>
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={StyleUtils.PRIMARY_COLOR} />
        ) : (
          <Button title="Login" onPress={signIn} color={StyleUtils.PRIMARY_COLOR} />
        )}
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: StyleUtils.SECONDARY_COLOR,
    ...StyleUtils.CENTERED_CONTAINER,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING_MEDIUM,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    ...StyleUtils.TEXT_INPUT_STYLE, // Apply the TEXT_INPUT_STYLE
  },
  buttonContainer: {
    marginTop: SPACING_MEDIUM,
    alignSelf: 'center',
    ...StyleUtils.BUTTON_STYLE, // Apply the BUTTON_STYLE
  },
});
