import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  FlatList
} from 'react-native';

import { FIREBASE_AUTH, FIRESTORE_INSTANCE } from '../../firebase/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import StyleUtils, {
  BUTTON_CONTAINER,
  BUTTON_WRAPPER,
  CENTERED_CONTAINER,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SPACING_MEDIUM,
} from '../../utils/StyleUtils';


const ClubInfoContainer = ({ navigation, clubInfo }) => {
  const handleNavigateToClubDetails = () => {
      navigation.navigate('MyClub', { clubInfo });
    };
  return (
    <TouchableOpacity
      style={styles.clubContainer}
      onPress={() => handleNavigateToClubDetails(navigation, clubInfo)}
    >
      <ImageBackground
        source={{ uri: clubInfo.clubImage }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <View style={styles.textContainer}>
          <Text style={styles.clubName}>{clubInfo.clubName}</Text>
          <Text style={styles.clubLocation}>{clubInfo.location}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const Menu = ({ navigation }) => {
  const handleNavigateToAddClub = () => {
    navigation.navigate('AddClub');
  };

  const [loading, setLoading] = useState(false);
  const [clubs, setClubs] = useState([]);

  const fetchClubs = async () => {
    setLoading(true);
    const user = FIREBASE_AUTH.currentUser;

    if (!user) {
      navigation.navigate('FirstScreen');
      return; // Exit the function if the user is not authenticated
    }

    const creatorId = user.uid;

    const clubsCollection = collection(FIRESTORE_INSTANCE, 'clubs');
    const clubsSnapshot = await getDocs(clubsCollection);
    const clubsData = clubsSnapshot.docs
      .filter((doc) => doc.data().createdBy === creatorId) // Filter clubs by the current user's ID
      .map((doc) => ({ id: doc.id, ...doc.data() }));

    setClubs(clubsData);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        // User is logged in, fetch clubs or perform other actions
        fetchClubs();
      } else {
        // User is not logged in, navigate to the entry screen
        navigation.navigate('FirstScreen');
      }
    });

    // Fetch clubs when the component mounts
    fetchClubs();

    // Add listener to fetch clubs when screen is focused
    const focusListener = navigation.addListener('focus', () => {
      fetchClubs();
    });

    return () => {
      unsubscribe();
      focusListener(); // Remove the focus listener when the component unmounts
    };
  }, [navigation]);

  const handleRefresh = () => {
    fetchClubs();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={StyleUtils.PRIMARY_COLOR} />
        </View>
      ) : (
        <>
          <FlatList
            data={clubs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ClubInfoContainer navigation={navigation} clubInfo={item} />
            )}
          />
          <View style={BUTTON_CONTAINER}>
            <View style={BUTTON_WRAPPER}>
              <Button
                onPress={() => FIREBASE_AUTH.signOut()}
                title="Logout"
                color={StyleUtils.PRIMARY_COLOR}
              />
            </View>
            <View style={BUTTON_WRAPPER}>
              <Button
                onPress={handleNavigateToAddClub}
                title="Add Club"
                color={StyleUtils.PRIMARY_COLOR}
              />
            </View>
            <View style={BUTTON_WRAPPER}>
              <Button
                onPress={handleRefresh}
                title="Refresh"
                color={StyleUtils.PRIMARY_COLOR}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CENTERED_CONTAINER,
    paddingTop: 5,
    flex: 1,
  },
  loadingContainer: {
    ...CENTERED_CONTAINER,
    flex: 1,
  },
  clubContainer: {
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
    backgroundColor: SECONDARY_COLOR,
    marginBottom: 10, // Adjust the marginBottom to control spacing between clubs
    borderRadius: 5,
    alignSelf: 'center',
    minWidth: '100%',
    height: 200, // Increase the height of each club container
    justifyContent: 'center', // Center the content vertically
  },
  clubList: {
    backgroundColor: SECONDARY_COLOR,
    //Testiranje border, treba biti rasprostranjen do gumbova i scrollable
    borderColor: 'white',
    borderWidth: 1,
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    marginBottom: 10,
    flex: 1,
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  clubLocation: {
    fontSize: 16,
    color: PRIMARY_COLOR,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 1,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'crop', // Crop or stretch the image to cover the container
    opacity: 0.8, // Apply a slight blur effect
    resizeMode: 'cover'
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background for text
    padding: 10,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default Menu;
