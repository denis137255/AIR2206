  import React, { useState } from 'react';
  import { View, Text, TextInput, Button, Alert } from 'react-native';
  import PhoneInput from 'react-native-phone-input';
  import { collection, addDoc, updateDoc, doc} from 'firebase/firestore';
  import { FIRESTORE_INSTANCE, FIREBASE_AUTH, getListOfImages} from '../../firebase/FirebaseConfig';
  import {
    GooglePlacesAutocomplete,
  } from 'react-native-google-places-autocomplete';


  // You can import additional libraries for Google Maps integration here
      

  const AddClubScreen = ({ navigation }) => {
    const [clubName, setClubName] = useState('');
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [workingHours, setWorkingHours] = useState('');
  
    const handleAddClub = async () => {
      if (!clubName || !location || !phoneNumber || !workingHours) {
        Alert.alert('Missing Information', 'Please fill in all fields');
        return;
      }

      if (!workingHours.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]\s*-\s*(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) {
        Alert.alert('Invalid Working Hours', 'Please enter working hours in the format "hh:mm - hh:mm"');
        return;
      }
  
      try {
        const currentUser = FIREBASE_AUTH.currentUser;

        const creatorId = currentUser.uid;
        const clubsCollectionRef = collection(FIRESTORE_INSTANCE, 'clubs');
  
        const imageUrls = await getListOfImages(); // Fetch list of image URLs
        const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
  
        const clubData = {
          clubId: null, // To be filled later
          clubName,
          location,
          phoneNumber,
          workingHours,
          clubImage: randomImageUrl,
          createdBy: creatorId,
        };
  
        const docRef = await addDoc(clubsCollectionRef, clubData);
        const clubId = docRef.id;
  
        // Update the club's data with the generated clubId
        const existingDocRef = doc(FIRESTORE_INSTANCE, 'clubs', docRef.id); // Assuming newDocRef.id is the document ID
        const updatedData = {
          // Update the fields you want to change
          clubId: clubId,
        };

        await updateDoc(existingDocRef, updatedData);

        
  
        // Success, navigate to the next screen or perform any other action
        navigation.navigate('AddFloor', { clubId, clubData });
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
          <GooglePlacesAutocomplete
            placeholder="Enter location"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              setLocation(details.formatted_address); // Set the selected location
            }}
            query={{
              key: 'AIzaSyA7UNIGsCr4eTYd7EjivR_lwcKgPpFdPPw',
              language: 'en',
            }}
            styles={{
              textInput: { borderWidth: 1, padding: 8, marginBottom: 16 },
            }}
            // Set fetchDetails to get additional details such as formatted_address
            fetchDetails
          />
    
          <Text>Contact:</Text>
          <PhoneInput
            ref={(ref) => {
              phoneInput = ref;
            }}
            value={phoneNumber}
            onChangePhoneNumber={setPhoneNumber}
            initialCountry="hr"
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