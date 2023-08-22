  import React, { useState } from 'react';
  import { View, Text, TextInput, Button, Alert } from 'react-native';
  import { collection, addDoc } from 'firebase/firestore';
  import { FIRESTORE_INSTANCE, FIREBASE_AUTH, getListOfImages} from '../../firebase/FirebaseConfig';
import { listAll } from 'firebase/storage';


  const phoneNumberRegex = /^[0-9\s-]{9,10}$/;
  const workingHoursRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]\s*-\s*(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

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

          const currentUser = FIREBASE_AUTH.currentUser;

          if (!currentUser) {
            Alert.alert('Authentication Error', 'User not authenticated');
            return;
          }
        
         {/* if (!phoneNumberRegex.test(contact)) {
            Alert.alert('Invalid Contact', 'Please enter a valid phone number.');
            return;
          } */}
          
          {/* if (!workingHoursRegex.test(workingHours)) {
            Alert.alert('Invalid Working Hours', 'Please enter working hours in the format "hh:mm - hh:mm".');
            return;
          } */}
    
          const creatorId = currentUser.uid;
    
          const clubsCollectionRef = collection(FIRESTORE_INSTANCE, 'clubs');

          const imageUrls = await getListOfImages(); // Fetch list of image URLs
          const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

          const clubData = {
              clubName,
              location,
              contact,
              workingHours,
              clubImage: randomImageUrl,
              createdBy: creatorId   
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
            placeholder="042 123 4567"
            style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
          />
    
          <Text>Working Hours:</Text>
          <TextInput
            value={workingHours}
            onChangeText={setWorkingHours}
            placeholder="08:00 - 23:00"
            style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
          />
    
          <Button title="Submit" onPress={handleAddClub} />
        </View>
      );
    };
    
    export default AddClubScreen;