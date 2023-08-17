import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';
import { deleteDoc, doc } from 'firebase/firestore';
import { FIRESTORE_INSTANCE } from '../../firebase/FirebaseConfig';

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
      
      <Button title="Edit" onPress={() => navigation.navigate('EditClub', { clubInfo })} />
      <Button title="Delete" onPress={handleDeleteClub} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    borderWidth: 1,
    padding: 8,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default MyClubScreen;
