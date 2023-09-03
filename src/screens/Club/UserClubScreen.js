import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground} from 'react-native';
import StyleUtils, {
  FONT_SIZE_MEDIUM,
  FONT_FAMILY_BOLD,
  TEXT_INPUT_STYLE,
  BUTTON_CONTAINER,
  BUTTON_WRAPPER,
  SPACING_MEDIUM,
  BORDER_RADIUS,
  SECONDARY_COLOR,
  PRIMARY_COLOR,
  TEXT_COLOR,
  getStatusBarHeight
} from '../../utils/StyleUtils';

const UserClubScreen = ({ route, navigation }) => {
  const { clubInfo } = route.params;

  // Sample data for events (replace with actual event data)
  const events = [
    { id: '1', name: 'Event 1' },
    { id: '2', name: 'Event 2' },
    // Add more events here
  ];

  const navigateToEventInfo = (eventId) => {
    navigation.navigate('UserEventInfo', { eventId });
  };

  return (
    <View style={styles.container}>
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
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.eventItem}
            >
            <View style={styles.infoRow}>
              <Text style={{color:'white'}}>{item.name}</Text>
              <Text style={{color:'white'}}> Date </Text>
            </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    marginTop: getStatusBarHeight(),
  },
  imageBackground: {
    flex: 1,
    borderRadius: 1,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'crop',
    opacity: 0.7,
    resizeMode: 'cover'
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
});

export default UserClubScreen;
