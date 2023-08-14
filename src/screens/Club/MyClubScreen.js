import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const MyClubScreen = ({ route, navigation }) => {
  const { clubInfo } = route.params;

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
