import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert} from 'react-native';
import StyleUtils, { SPACING_MEDIUM, CENTERED_CONTAINER, BUTTON_CONTAINER, BUTTON_WRAPPER, SECONDARY_COLOR} from '../../../utils/StyleUtils';
import { Picker } from '@react-native-picker/picker';


const RegistrationForm = ({ onBack }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('User');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const ComingSoon = async () => {
    Alert.alert('Note','Feature not yet added!');
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={firstName}
        placeholderTextColor={StyleUtils.TEXT_COLOR}
        style={styles.input}
        placeholder="First Name"
        onChangeText={setFirstName}
      />
      <TextInput
        value={lastName}
        placeholderTextColor={StyleUtils.TEXT_COLOR}
        style={styles.input}
        placeholder="Last Name"
        onChangeText={setLastName}
      />
      <TextInput
        value={email}
        placeholderTextColor={StyleUtils.TEXT_COLOR}
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={userType}
          style={styles.picker}
          onValueChange={(itemValue) => setUserType(itemValue)}
        >
          <Picker.Item label="User" value="User" />
          <Picker.Item label="Club Owner" value="Club Owner" />
        </Picker>
      </View>
      <TextInput
        value={password}
        secureTextEntry
        placeholderTextColor={StyleUtils.TEXT_COLOR}
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={setPassword}
      />
      <TextInput
        value={passwordRepeat}
        placeholderTextColor={StyleUtils.TEXT_COLOR}
        secureTextEntry
        style={styles.input}
        placeholder="Repeat Password"
        autoCapitalize="none"
        onChangeText={setPasswordRepeat}
      />
      <View style={BUTTON_CONTAINER}>
        <View style={BUTTON_WRAPPER}>
          <Button title="Register" onPress={ComingSoon} color={StyleUtils.PRIMARY_COLOR} />
        </View>
        <View style={BUTTON_WRAPPER}>
          <Button title="Back" onPress={onBack} color={StyleUtils.PRIMARY_COLOR} />
        </View>
      </View>
    </View>
  );
};

export default RegistrationForm;

const styles = StyleSheet.create({
  container: {
    ...CENTERED_CONTAINER,
    paddingHorizontal: SPACING_MEDIUM,
    paddingVertical: SPACING_MEDIUM, // Add padding to the vertical axis
    backgroundColor: SECONDARY_COLOR
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: StyleUtils.PRIMARY_COLOR,
    borderRadius: StyleUtils.BORDER_RADIUS,
    marginBottom: SPACING_MEDIUM,
  },
  picker: {
    color: StyleUtils.TEXT_COLOR,
    backgroundColor: 'transparent',
  },

  //OVO TREBA IMPORTAT IZ STYLEUTILS, ALI NE ZELI RADITI ... TODO

  input: {
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
