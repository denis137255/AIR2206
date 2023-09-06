import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore';
import { FIRESTORE_INSTANCE } from '../../firebase/FirebaseConfig';
import { StyleUtils, TEXT_COLOR } from '../../utils/StyleUtils';
import PhoneInput from 'react-native-phone-input';
import {
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';

const EditClubScreen = ({ route, navigation }) => {
  const { clubInfo } = route.params;
  const [editedClubData, setEditedClubData] = useState({ ...clubInfo });

  const handleSaveChanges = async () => {
    try {
      const clubDocRef = doc(FIRESTORE_INSTANCE, 'clubs', clubInfo.id);
      await updateDoc(clubDocRef, editedClubData);

      // Success, navigate back to the MyClub screen
      navigation.goBack();
    } catch (error) {
      console.error('Error updating club:', error);
      Alert.alert('Error', 'An error occurred while updating the club');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Club Name:</Text>
      <TextInput
        value={editedClubData.clubName}
        onChangeText={(value) => setEditedClubData({ ...editedClubData, clubName: value })}
        style={styles.input}
      />

      <Text style={styles.label}>Location:</Text>
      <GooglePlacesAutocomplete
        value={editedClubData.location}
        placeholder="Enter location"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          setEditedClubData({ ...editedClubData, location: details.formatted_address });
        }}
        query={{
          key: 'AIzaSyA7UNIGsCr4eTYd7EjivR_lwcKgPpFdPPw', // Replace with your Google API Key
          language: 'en',
        }}
        styles={{container: styles.borderInput, textInputContainer: styles.locationInput1, textInput: styles.locationInput2}}
        textInputProps={{
          placeholderTextColor: TEXT_COLOR,
        }}
        fetchDetails
      />

      <Text style={styles.label}>Contact:</Text>
      <PhoneInput
        value={editedClubData.contact}
        onChangePhoneNumber={(value) => setEditedClubData({ ...editedClubData, contact: value })}
        initialCountry="hr"
        style={styles.phoneInput}
      />

      <Text style={styles.label}>Working Hours:</Text>
      <TextInput
        value={editedClubData.workingHours}
        onChangeText={(value) => setEditedClubData({ ...editedClubData, workingHours: value })}
        placeholder="Example: 08:00 - 23:00"
        placeholderTextColor={TEXT_COLOR}
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Save Changes"
          onPress={handleSaveChanges}
          color={StyleUtils.PRIMARY_COLOR}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleUtils.CENTERED_CONTAINER,
    padding: StyleUtils.SPACING_MEDIUM,
    backgroundColor: StyleUtils.SECONDARY_COLOR,
  },
  label: {
    fontSize: StyleUtils.FONT_SIZE_MEDIUM,
    fontWeight: 'bold',
    marginBottom: StyleUtils.SPACING_SMALL,
    color: StyleUtils.TEXT_COLOR,
    alignSelf: 'baseline',
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
  locationInput1:{
    fontSize: StyleUtils.FONT_SIZE_MEDIUM,
    fontFamily: StyleUtils.FONT_FAMILY_REGULAR,
    borderRadius: StyleUtils.BORDER_RADIUS,
    color: StyleUtils.TEXT_COLOR,
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  locationInput2:{
      height: 48,
      borderWidth: 1,
      borderColor: StyleUtils.PRIMARY_COLOR,
      marginBottom: StyleUtils.SPACING_MEDIUM,
      fontSize: StyleUtils.FONT_SIZE_MEDIUM,
      fontFamily: StyleUtils.FONT_FAMILY_REGULAR,
      borderRadius: StyleUtils.BORDER_RADIUS,
      color: StyleUtils.TEXT_COLOR,
      backgroundColor: 'transparent',
  },
  borderInput: {
    width: '100%',
    zIndex: 2,
    position: 'relative',
  },
  phoneInput: {
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
    backgroundColor: 'grey',
  },
  buttonContainer: {
    ...StyleUtils.BUTTON_CONTAINER,
  },
});

export default EditClubScreen;
