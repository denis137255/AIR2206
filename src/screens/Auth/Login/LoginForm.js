import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import StyleUtils, { SPACING_MEDIUM, CENTERED_CONTAINER, BUTTON_CONTAINER, BUTTON_WRAPPER } from '../../../utils/StyleUtils';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../firebase/FirebaseConfig';

const LoginForm = ({ onBack, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      signInWithEmailAndPassword(auth, email, password);
    
    } catch (error) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        style={styles.text_input}
        placeholder="Email"
        placeholderTextColor={StyleUtils.TEXT_COLOR}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        value={password}
        secureTextEntry
        placeholder="Password"
        placeholderTextColor={StyleUtils.TEXT_COLOR}
        style={styles.text_input}
        autoCapitalize="none"
        onChangeText={setPassword}
      />
      <View style={BUTTON_CONTAINER}>
        <View style={BUTTON_WRAPPER}>
          <Button
            title="Sign In"
            onPress={signIn}
            color={StyleUtils.PRIMARY_COLOR}
            style={styles.button}
          />
        </View>
        <View style={BUTTON_WRAPPER}>
          <Button
            title="Return"
            onPress={onBack}
            color={StyleUtils.PRIMARY_COLOR}
            style={styles.button}
          />
        </View>
      </View>
      {loading && <ActivityIndicator size="large" color={StyleUtils.PRIMARY_COLOR} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CENTERED_CONTAINER,
    paddingHorizontal: SPACING_MEDIUM,
    paddingVertical: SPACING_MEDIUM,
    backgroundColor: StyleUtils.SECONDARY_COLOR,
  },
  text_input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: StyleUtils.PRIMARY_COLOR,
    paddingHorizontal: StyleUtils.SPACING_MEDIUM,
    marginBottom: StyleUtils.SPACING_MEDIUM,
    fontSize: StyleUtils.FONT_SIZE_MEDIUM,
    fontFamily: StyleUtils.FONT_FAMILY_REGULAR,
    borderRadius: StyleUtils.BORDER_RADIUS,
    color: StyleUtils.TEXT_COLOR,
    backgroundColor: 'transparent',
  },
});

export default LoginForm;
