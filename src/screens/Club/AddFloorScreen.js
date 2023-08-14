import React from 'react';
import { View, Text, Button } from 'react-native';

const AddFloorScreen = ({ navigation }) => {
  const handleSkip = () => {
    navigation.navigate('Menu'); // Navigate to the main menu
  };

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: 300,
          height: 300,
          backgroundColor: '#ccc',
          borderWidth: 1,
          borderColor: 'black',
        }}
      >
        {/* You can add a drawing tool here */}
        {/* For example, use the Expo's sketch tool or any other drawing library */}
        {/* This is where users will draw the floor layout */}
      </View>

      <Button title="Submit" onPress={() => {}} />

      <Button title="Skip" onPress={handleSkip} />
    </View>
  );
};

AddFloorScreen.navigationOptions = ({ navigation }) => ({
    headerLeft: () => null, // Hide the back arrow
  });

export default AddFloorScreen;