import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  TextInput,
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
    const handleNavigateToUserClubScreen = () => {
        navigation.navigate('UserClubScreen', { clubInfo });
      };
    return (
      <TouchableOpacity
        style={styles.clubContainer}
        onPress={() => handleNavigateToUserClubScreen(navigation, clubInfo)}
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

const UserMenu = ({ navigation }) => {
  const handleNavigateToAddClub = () => {
    navigation.navigate('AddClub');
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClubs, setFilteredClubs] = useState([]);

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
    const clubsData = clubsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

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

  const filterClubs = () => {
    const filtered = clubs.filter(club =>
      club.clubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredClubs(filtered);
  };
  
  useEffect(() => {
    filterClubs();
  }, [searchQuery, clubs]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={StyleUtils.PRIMARY_COLOR} />
        </View>
      ) : (
        <>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by club name or location"
              placeholderTextColor={StyleUtils.TEXT_COLOR}
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
          </View>
          <FlatList
            data={filteredClubs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ClubInfoContainer navigation={navigation} clubInfo={item} />
                )}
              />
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
  searchContainer: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: StyleUtils.PRIMARY_COLOR,
    marginBottom: StyleUtils.SPACING_SMALL,
    marginTop: StyleUtils.SPACING_SMALL,
    fontSize: StyleUtils.FONT_SIZE_MEDIUM,
    fontFamily: StyleUtils.FONT_FAMILY_REGULAR,
    borderRadius: StyleUtils.BORDER_RADIUS,
    color: StyleUtils.TEXT_COLOR,
    backgroundColor: 'transparent',
  },
  searchInput: {   
    width: '100%',
    height: 48,
    borderColor: StyleUtils.PRIMARY_COLOR,
    paddingHorizontal: StyleUtils.SPACING_MEDIUM,
    marginBottom: StyleUtils.SPACING_MEDIUM,
    fontSize: StyleUtils.FONT_SIZE_MEDIUM,
    fontFamily: StyleUtils.FONT_FAMILY_REGULAR,
    borderRadius: StyleUtils.BORDER_RADIUS,
    color: StyleUtils.TEXT_COLOR,
    backgroundColor: 'transparent',
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
    resizeMode: 'crop',
    opacity: 0.8,
    resizeMode: 'cover'
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserMenu;
