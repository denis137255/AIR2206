import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { FIRESTORE_INSTANCE, FIREBASE_AUTH } from '../../firebase/FirebaseConfig';

import { launchImageLibrary } from 'react-native-image-picker';



// You can import additional libraries for Google Maps integration here
    
const AddClubScreen = ({ navigation }) => {
    const [clubName, setClubName] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [workingHours, setWorkingHours] = useState('');
    const [clubImage, setClubImage] = useState(null); // State for the selected image

    const handleImagePicker = () => {
        launchImageLibrary(
          {
            mediaType: 'photo',
            quality: 1,
          },
          (response) => {
            if (response.didCancel) {
              // User cancelled the picker
              console.log('Image picker cancelled by user');
            } else if (response.errorCode) {
              // Error occurred while picking the image
              console.error('Image picker error:', response.errorMessage);
            } else {
              // Image selected successfully, set it to the state
              setClubImage(response.uri);
            }
          }
        );
      };

    const handleAddClub = async () => {
      if (!clubName || !location || !contact || !workingHours) {
        Alert.alert('Missing Information', 'Please fill in all fields');
        return;
      }
  
      try {

        const currentUser = FIREBASE_AUTH.currentUser;

        if (!currentUser) {
          Alert.alert('Authentication Error', 'User not authenticated');
          return;
        }
  
        const creatorId = currentUser.uid;
  
        const clubsCollectionRef = collection(FIRESTORE_INSTANCE, 'clubs');

        const clubData = {
            clubName,
            location,
            contact,
            workingHours,
          }
          
        if (clubImage) {
         // Upload the image and get the URL
        const imageResponse = await uploadImageToServer(clubImage); // Implement this function
        clubData.clubImage = imageResponse.imageUrl;
    }
    
    await addDoc(clubsCollectionRef, clubData);

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