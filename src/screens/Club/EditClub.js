import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore';
import { FIRESTORE_INSTANCE } from '../../firebase/FirebaseConfig';
import { StyleUtils } from '../../utils/StyleUtils'; // Import StyleUtils

const EditClubScreen = ({ route, navigation }) => {
  const { clubInfo } = route.params;
  const [editedClubInfo, setEditedClubInfo] = useState({ ...clubInfo });

  const handleSaveChanges = async () => {
    try {
      const clubDocRef = doc(FIRESTORE_INSTANCE, 'clubs', clubInfo.id);
      await updateDoc(clubDocRef, editedClubInfo);

      // Success, navigate back to the MyClub screen
      navigation.goBack();
    } catch (error) {
      console.error('Error updating club:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Club Name:</Text>
      <TextInput
        value={editedClubInfo.clubName}
        onChangeText={(value) => setEditedClubInfo({ ...editedClubInfo, clubName: value })}
        style={styles.input}
      />

      <Text style={styles.label}>Location:</Text>
      <TextInput
        value={editedClubInfo.location}
        onChangeText={(value) => setEditedClubInfo({ ...editedClubInfo, location: value })}
        style={styles.input}
      />

      <Text style={styles.label}>Contact:</Text>
      <TextInput
        value={editedClubInfo.contact}
        onChangeText={(value) => setEditedClubInfo({ ...editedClubInfo, contact: value })}
        style={styles.input}
      />

      <Text style={styles.label}>Working Hours:</Text>
      <TextInput
        value={editedClubInfo.workingHours}
        onChangeText={(value) => setEditedClubInfo({ ...editedClubInfo, workingHours: value })}
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Save Changes"
          onPress={handleSaveChanges}
          color={StyleUtils.PRIMARY_COLOR} // Use primary color from StyleUtils
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleUtils.CENTERED_CONTAINER, // Apply centered container style
    padding: StyleUtils.SPACING_LARGE, // Use SPACING_LARGE from StyleUtils
  },
  label: {
    fontSize: StyleUtils.FONT_SIZE_MEDIUM, // Use FONT_SIZE_MEDIUM from StyleUtils
    fontWeight: 'bold',
    marginBottom: StyleUtils.SPACING_SMALL, // Use SPACING_SMALL from StyleUtils
    color: StyleUtils.TEXT_COLOR, // Use TEXT_COLOR from StyleUtils
  },
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
  buttonContainer: {
    ...StyleUtils.BUTTON_CONTAINER, // Apply BUTTON_CONTAINER from StyleUtils
  },
});

export default EditClubScreen;
