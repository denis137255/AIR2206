import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../firebase/FirebaseConfig'; // Import your Firebase config
import StyleUtils, { CENTERED_CONTAINER, INTRO_BUTTON, INTRO_CONTAINER, PRIMARY_COLOR, TEXT_COLOR, TEXT_INPUT_STYLE } from '../../../utils/StyleUtils';

const EmailPasswordSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      // Authentication successful, you can navigate to the next screen or perform actions.
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={INTRO_CONTAINER}>
    <View style={{width: '95%', alignItems: 'center'}}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        placeholderTextColor={TEXT_COLOR}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        placeholderTextColor={TEXT_COLOR}
      />
      <View style={INTRO_BUTTON}>
      <Button title="Sign In" onPress={handleSignIn} color={PRIMARY_COLOR}/>
      {error ? <Text>{error}</Text> : null}
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    input: {
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
})

export default EmailPasswordSignIn;
