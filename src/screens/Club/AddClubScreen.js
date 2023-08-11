import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { FIRESTORE_INSTANCE } from '../../firebase/FirebaseConfig';


// You can import additional libraries for Google Maps integration here
    
const AddClubScreen = ({ navigation }) => {
    const [clubName, setClubName] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [workingHours, setWorkingHours] = useState('');
  
    const handleAddClub = async () => {
      if (!clubName || !location || !contact || !workingHours) {
        Alert.alert('Missing Information', 'Please fill in all fields');
        return;
      }
  
      try {
        const clubsCollectionRef = collection(FIRESTORE_INSTANCE, 'clubs');
        await addDoc(clubsCollectionRef, {
          clubName,
          location,
          contact,
          workingHours,
        });
  
        // Success, navigate to the next screen or perform any other action
        navigation.replace('AddFloor'); // Replace with your desired navigation
      } catch (error) {
        console.error('Error adding club:', error);
        Alert.alert('Error', 'An error occurred while adding the club');
      }
    };
  
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text>Club Name:</Text>
        <TextInput
          value={clubName}
          onChangeText={setClubName}
          placeholder="Enter club name"
          style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
        />
  
        <Text>Location:</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          placeholder="Enter location"
          style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
        />
  
        <Text>Contact:</Text>
        <TextInput
          value={contact}
          onChangeText={setContact}
          placeholder="Enter contact information"
          style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
        />
  
        <Text>Working Hours:</Text>
        <TextInput
          value={workingHours}
          onChangeText={setWorkingHours}
          placeholder="Enter working hours"
          style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
        />
  
        <Button title="Submit" onPress={handleAddClub} />
      </View>
    );
  };
  
  export default AddClubScreen;