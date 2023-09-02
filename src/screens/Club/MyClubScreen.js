import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import StyleUtils, {
  FONT_SIZE_MEDIUM,
  FONT_FAMILY_BOLD,
  SPACING_MEDIUM,
  BORDER_RADIUS,
  SECONDARY_COLOR,
  PRIMARY_COLOR,
  TEXT_COLOR,
  SPACING_SMALL,
  getStatusBarHeight,
  SPACING_LARGE,
} from '../../utils/StyleUtils';
import { FIRESTORE_INSTANCE } from '../../firebase/FirebaseConfig';
import Svg, { Circle, Path } from 'react-native-svg';

const MyClubScreen = ({ route, navigation }) => {
  const { clubInfo } = route.params;
  const [svgData, setSvgData] = useState('');
  const [dots, setDots] = useState([]);

  // Sample data for events (replace with actual event data)
  const events = [
    { id: '1', name: 'Event 1' },
    { id: '2', name: 'Event 2' },
    // Add more events here
  ];

  useEffect(() => {
    const fetchFloorData = async () => {
      try {
        const floorDocRef = doc(FIRESTORE_INSTANCE, 'floor', clubInfo.clubId);
        const floorDocSnapshot = await getDoc(floorDocRef);
  
        if (floorDocSnapshot.exists()) {
          const floorDataFromFirebase = floorDocSnapshot.data();
          setSvgData(floorDataFromFirebase.floorPlanData);
          setDots(floorDataFromFirebase.dots);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchFloorData();
  }, []);

  // Adjust these values according to your SVG dimensions
  const svgWidth = Dimensions.get('window').width * 0.95;
  const svgHeight = Dimensions.get('window').height * 0.7; // Adjust the height as needed

  const navigateToEventInfo = (eventId) => {
    navigation.navigate('UserEventInfo', { eventId });
  };
  
  
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
    <ScrollView style={styles.container}>
        <ImageBackground
          source={{ uri: clubInfo.clubImage }}
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
        <View style={styles.clubDetails}>
            <Text style={styles.clubName}>{clubInfo.clubName}</Text>
            <Text style={styles.clubLocation}>{clubInfo.location}</Text>
            <Text style={styles.clubContact}>{clubInfo.contact}</Text>
            <Text style={styles.clubWorkingHours}>{clubInfo.workingHours}</Text>
      </View>
        </ImageBackground>



      <View style={styles.eventsContainer}>
        <Text style={styles.eventsHeading}>Events:</Text>
        {events.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.eventItem}
            onPress={() => navigateToEventInfo(item.id)}
          >
            <View style={styles.infoRow}>
              <Text style={{ color: 'white' }}>{item.name}</Text>
              <Text style={{ color: 'white' }}> Date </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.floorPlanContainer}>
        <Svg
          width={svgWidth}
          height={svgHeight}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={styles.svg}
        >
          <Path
            d={svgData}
            fill="transparent"
            stroke="white"
            strokeWidth={5}
          />

          {dots.map((dot, index) => (
            <Circle
              key={index}
              cx={dot.x}
              cy={dot.y}
              r={dot.radius}
              fill={dot.color}
            />
          ))}
        </Svg>
      </View>


      {/* Add more fields for other club information */}
    <View style={StyleUtils.BUTTON_CONTAINER}>
      <View style={styles.buttonContainer}>
        <Button 
        title="Edit" 
        onPress={() => navigation.navigate('EditClub', { clubInfo })}
        color={StyleUtils.PRIMARY_COLOR}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Create Event"
          //TODO onPress={() => navigation.navigate('CreateEvent', { clubId: clubInfo.id })}
          color={StyleUtils.PRIMARY_COLOR} // Use primary color from StyleUtils
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Delete" onPress={handleDeleteClub} color="red" />
      </View>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    marginTop: getStatusBarHeight(),
  },
  floorPlanContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: BORDER_RADIUS,
    marginBottom: SPACING_MEDIUM,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 1,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'crop',
    opacity: 0.3,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  clubDetails: {
    marginBottom: SPACING_MEDIUM,
    padding: SPACING_MEDIUM,
  },
  clubName: {
    fontSize: FONT_SIZE_MEDIUM,
    fontFamily: FONT_FAMILY_BOLD,
    marginBottom: SPACING_MEDIUM,
    color: StyleUtils.PRIMARY_COLOR,
  },
  clubLocation: {
    fontSize: FONT_SIZE_MEDIUM,
    marginBottom: SPACING_MEDIUM,
    color: StyleUtils.TEXT_COLOR,
  },
  clubContact: {
    fontSize: FONT_SIZE_MEDIUM,
    marginBottom: SPACING_MEDIUM,
    color: StyleUtils.TEXT_COLOR,
  },
  clubWorkingHours: {
    fontSize: FONT_SIZE_MEDIUM,
    marginBottom: SPACING_MEDIUM,
    color: StyleUtils.TEXT_COLOR,
  },
  mapsContainer: {
    marginBottom: SPACING_MEDIUM,
  },
  mapsBorder: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: BORDER_RADIUS,
    backgroundColor: SECONDARY_COLOR,
    padding: SPACING_MEDIUM,
  },
  mapsPlaceholderText: {
    color: 'gray',
    textAlign: 'center',
  },
  eventsContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: BORDER_RADIUS,
    padding: SPACING_MEDIUM,
    backgroundColor: SECONDARY_COLOR,
    color: TEXT_COLOR,
    marginBottom: 10,
  },
  eventsHeading: {
    fontSize: FONT_SIZE_MEDIUM,
    fontFamily: FONT_FAMILY_BOLD,
    marginBottom: SPACING_MEDIUM,
    color: StyleUtils.PRIMARY_COLOR,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  eventItem: {
    padding: SPACING_MEDIUM,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    color: TEXT_COLOR,
  },
  buttonContainer: {
    paddingBottom: SPACING_SMALL,
  },
});

export default MyClubScreen;
