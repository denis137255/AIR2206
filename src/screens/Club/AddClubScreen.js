import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

// You can import additional libraries for Google Maps integration here
    
const AddClubScreen = ( {navigation} ) =>  {
  const [clubName, setClubName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [clubImage, setClubImage] = useState('');

  const handleAddClub = () => {
    navigation.navigate('AddFloor');
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
      {/* Implement Google Maps integration here */}
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
      {/* Implement a cool working hours picker here */}
      <TextInput
        value={workingHours}
        onChangeText={setWorkingHours}
        placeholder="Enter working hours"
        style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
      />

      <Text>Club Image (optional):</Text>
      {/* Implement image upload here */}
      <TextInput
        value={clubImage}
        onChangeText={setClubImage}
        placeholder="Enter image URL"
        style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
      />

      <Button title="Next" onPress={handleAddClub}/>
    </View>
  );
};

export default AddClubScreen;
