  import React, { useState } from 'react';
  import { View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
  import PhoneInput from 'react-native-phone-input';
  import { PRIMARY_COLOR, SECONDARY_COLOR, StyleUtils, TEXT_COLOR } from '../../utils/StyleUtils'; // Import StyleUtils 
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
        <View style={styles.container}>
          <Text style={styles.Text}>Club Name:</Text>
          <TextInput
            value={clubName}
            onChangeText={setClubName}
            placeholder="Enter club name"
            placeholderTextColor={StyleUtils.TEXT_COLOR}
            style={styles.input}
          />

          
    
          <Text style={styles.Text}>Location:</Text>
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
            styles={{container: styles.borderInput, textInputContainer: styles.locationInput1, textInput: styles.locationInput2}}
            textInputProps={{
              placeholderTextColor: TEXT_COLOR,
            }}
            // Set fetchDetails to get additional details such as formatted_address
            fetchDetails
            
          />
    
          <Text style={styles.Text} >Contact:</Text>
          <PhoneInput
            ref={(ref) => {
              phoneInput = ref;
            }}
            value ={phoneNumber}
            onChangePhoneNumber={setPhoneNumber}
            initialCountry="hr"
            style={{...styles.input, backgroundColor: 'grey'}}
          />

          <Text style={styles.Text}>Working Hours:</Text>
          <TextInput
            value={workingHours}
            onChangeText={setWorkingHours}
            placeholder="Example: 08:00 - 23:00"
            placeholderTextColor={StyleUtils.TEXT_COLOR}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleAddClub} color={PRIMARY_COLOR} />
          </View>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        ...StyleUtils.CENTERED_CONTAINER, // Apply centered container style
        padding: StyleUtils.SPACING_MEDIUM, // Use SPACING_LARGE from StyleUtils
        backgroundColor: SECONDARY_COLOR,
      },
      buttonContainer: {
        paddingBottom: StyleUtils.SPACING_SMALL,
        width: '100%',
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
          borderColor: PRIMARY_COLOR,
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

      Text: {
        fontSize: StyleUtils.FONT_SIZE_MEDIUM, // Use FONT_SIZE_MEDIUM from StyleUtils
        fontWeight: 'bold',
        marginBottom: StyleUtils.SPACING_SMALL, // Use SPACING_SMALL from StyleUtils
        color: StyleUtils.TEXT_COLOR, // Use TEXT_COLOR from StyleUtils
        alignSelf: 'baseline'
      },
    })

    const phoneInputStyles = StyleSheet.create({
      placeholder: {
        color: StyleUtils.TEXT_COLOR,
      },
    });
    
    export default AddClubScreen;