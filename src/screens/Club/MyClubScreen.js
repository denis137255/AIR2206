import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { deleteDoc, doc } from 'firebase/firestore';
import { FIRESTORE_INSTANCE } from '../../firebase/FirebaseConfig';
import { StyleUtils } from '../../utils/StyleUtils'; // Import StyleUtils

const MyClubScreen = ({ route, navigation }) => {
  const { clubInfo } = route.params;

  const handleDeleteClub = async () => {
    try {
      const clubDocRef = doc(FIRESTORE_INSTANCE, 'clubs', clubInfo.id);
      await deleteDoc(clubDocRef);
      Alert.alert('Success', 'Club deleted successfully');
      navigation.goBack(); // Go back to the previous screen
    } catch (error) {
      console.error('Error deleting club:', error);
      Alert.alert('Error', 'An error occurred while deleting the club');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Club Name:</Text>
        <TextInput style={styles.value} value={clubInfo.clubName} editable={false} />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Location:</Text>
        <TextInput style={styles.value} value={clubInfo.location} editable={false} />
      </View>

      {/* Add more fields for other club information */}
      <View style={styles.buttonContainer}>
        <Button 
        title="Edit" 
        onPress={() => navigation.navigate('EditClub', { clubInfo })}
        color={StyleUtils.PRIMARY_COLOR}
         />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Create Event"
    // TODO onPress={() => navigation.navigate('CreateEvent', { clubId: clubInfo.id })}
          color={StyleUtils.PRIMARY_COLOR} // Use primary color from StyleUtils
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Delete" onPress={handleDeleteClub} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleUtils.CENTERED_CONTAINER, // Apply centered container style
    padding: StyleUtils.SPACING_LARGE, // Use SPACING_LARGE from StyleUtils
  },
  fieldContainer: {
    marginBottom: StyleUtils.SPACING_MEDIUM, // Use SPACING_MEDIUM from StyleUtils
  },
  label: {
    fontSize: StyleUtils.FONT_SIZE_MEDIUM, // Use FONT_SIZE_MEDIUM from StyleUtils
    fontWeight: 'bold',
    marginBottom: StyleUtils.SPACING_SMALL, // Use SPACING_SMALL from StyleUtils
    color: StyleUtils.TEXT_COLOR, // Use TEXT_COLOR from StyleUtils
  },
  value: {
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
    marginBottom: StyleUtils.SPACING_MEDIUM, // Use SPACING_MEDIUM from StyleUtils
    width: '40%'
  },
});

export default MyClubScreen;
