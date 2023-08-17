import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import StyleUtils, { SPACING_MEDIUM } from '../../utils/StyleUtils';
import LoginForm from './Login/LoginForm';
import RegistrationForm from './Registration/RegistrationForm';
import { Picker } from '@react-native-picker/picker';


const LoginScreen = ({ navigation }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const renderInitialScreen = () => (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/new_logo.png')} style={styles.logo} />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Sign In"
            onPress={() => setShowLoginForm(true)}
            color={StyleUtils.PRIMARY_COLOR}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Register"
            onPress={() => setShowRegistrationForm(true)}
            color={StyleUtils.PRIMARY_COLOR}
          />
        </View>
      </View>
    </View>
  );

  const handleBackButton = () => {
    setShowLoginForm(false);
    setShowRegistrationForm(false);
  };

  return showLoginForm ? (
    <LoginForm onBack={handleBackButton} />
  ) : showRegistrationForm ? (
    <RegistrationForm onBack={handleBackButton} />
  ) : (
    renderInitialScreen()
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleUtils.CENTERED_CONTAINER,
    backgroundColor: StyleUtils.SECONDARY_COLOR,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING_MEDIUM,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'column',
    height: '15%',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: SPACING_MEDIUM,
    width: '50%',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: StyleUtils.SPACING_MEDIUM,
  },
  button: {
    paddingHorizontal: StyleUtils.SPACING_MEDIUM,
    paddingVertical: StyleUtils.SPACING_MEDIUM,
    borderRadius: StyleUtils.BORDER_RADIUS,
  },
});