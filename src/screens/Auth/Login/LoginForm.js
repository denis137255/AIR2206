import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import StyleUtils, { SPACING_MEDIUM, CENTERED_CONTAINER, BUTTON_CONTAINER,BUTTON_WRAPPER} from '../../../utils/StyleUtils';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../firebase/FirebaseConfig';

const LoginForm = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <View style={styles.container}>
      <TextInput
        value={email}
        style={styles.text_input} 
        placeholder="Email"
        placeholderTextColor={StyleUtils.TEXT_COLOR}
        keyboardType = "email-address"
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
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    ...CENTERED_CONTAINER,
    paddingHorizontal: SPACING_MEDIUM,
    paddingVertical: SPACING_MEDIUM, // Add padding to the vertical axis
    backgroundColor: StyleUtils.SECONDARY_COLOR,
  },

  //OVO TREBA IMPORTAT IZ STYLEUTILS, ALI NE ZELI RADITI ... TODO

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
