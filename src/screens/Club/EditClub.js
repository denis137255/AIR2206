import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore';
import { FIRESTORE_INSTANCE } from '../../firebase/FirebaseConfig';

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
      <Text>Club Name:</Text>
      <TextInput
        value={editedClubInfo.clubName}
        onChangeText={(value) => setEditedClubInfo({ ...editedClubInfo, clubName: value })}
        style={styles.input}
      />

      <Text>Location:</Text>
      <TextInput
        value={editedClubInfo.location}
        onChangeText={(value) => setEditedClubInfo({ ...editedClubInfo, location: value })}
        style={styles.input}
      />

      <Text>Contact:</Text>
      <TextInput
        value={editedClubInfo.contact}
        onChangeText={(value) => setEditedClubInfo({ ...editedClubInfo, contact: value })}
        style={styles.input}
      />

      <Text>Working Hours:</Text>
      <TextInput
        value={editedClubInfo.workingHours}
        onChangeText={(value) => setEditedClubInfo({ ...editedClubInfo, workingHours: value })}
        style={styles.input}
      />

      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

export default EditClubScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    input: {
      borderWidth: 1,
      padding: 8,
      marginBottom: 16,
    },
  });
  
