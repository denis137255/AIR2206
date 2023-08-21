import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
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
    <TouchableOpacity onPress={handleNavigateToClubDetails} style={styles.clubContainer}>
      <Text style={styles.clubName}>{clubInfo.clubName}</Text>
      <Text style={styles.clubLocation}>{clubInfo.location}</Text>
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
        fetchClubs(setClubs);
      } else {
        // User is not logged in, navigate to the entry screen
        navigation.navigate('FirstScreen');
      }
    });

    // Fetch clubs when the user navigates to the Menu page
    if (navigation.isFocused()) {
      fetchClubs(setClubs);
    }

    return () => unsubscribe(); // Clean up the listener when the component unmounts
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
          <ScrollView contentContainerStyle={styles.clubList}>
            {clubs.map((clubInfo) => (
              <ClubInfoContainer key={clubInfo.id} navigation={navigation} clubInfo={clubInfo} />
            ))}
          </ScrollView>
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
    padding: 10,
  },
  loadingContainer: {
    ...CENTERED_CONTAINER,
    flex: 1,
  },
  clubContainer: {
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    backgroundColor: SECONDARY_COLOR,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    alignSelf: 'center', // Center the container within the list
    minWidth: '100%',
  },
  clubList: {
    alignSelf: 'stretch',
    alignContent: 'center',
    padding: SPACING_MEDIUM,
    backgroundColor: SECONDARY_COLOR,
    flex: 1,
    //Testiranje border, treba biti rasprostranjen do gumbova i scrollable
    borderColor: 'white',
    borderWidth: 1,
    width: '100%',
    alignSelf: 'center',
    alignContent: 'stretch',
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
});

export default Menu;
