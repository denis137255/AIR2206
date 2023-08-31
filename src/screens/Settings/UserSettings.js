import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../../firebase/FirebaseConfig'; // Import your Firebase configuration
import StyleUtils from '../../utils/StyleUtils';

const UserSettings = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      // You can navigate to the login screen or any other screen after logging out
      navigation.navigate('FirstScreen'); // Replace 'FirstScreen' with your screen name
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const user = FIREBASE_AUTH.currentUser;
  const email = user ? user.email : 'N/A'; // Get user's email or set to 'N/A'
  const creationTime = user ? user.metadata.creationTime : 'N/A'; // Get creation time or set to 'N/A'

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{email}</Text>
      <Text style={styles.label}>Account Creation Date:</Text>
      <Text style={styles.text}>{creationTime}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Log Out"
          color={StyleUtils.PRIMARY_COLOR}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: StyleUtils.SPACING_MEDIUM,
    backgroundColor: StyleUtils.SECONDARY_COLOR,
  },
  label: {
    fontSize: StyleUtils.FONT_SIZE_MEDIUM,
    color: StyleUtils.TEXT_COLOR,
    marginBottom: StyleUtils.SPACING_SMALL,
  },
  text: {
    fontSize: StyleUtils.FONT_SIZE_MEDIUM,
    color: StyleUtils.TEXT_COLOR,
    marginBottom: StyleUtils.SPACING_MEDIUM,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: StyleUtils.SPACING_MEDIUM,
  },
});

export default UserSettings;
