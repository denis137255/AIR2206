import { View, Text, Button, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH, FIRESTORE_INSTANCE } from '../../firebase/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { withNavigation } from '@react-navigation/compat';
import refreshDataFromFirestore from '../../firebase/FirebaseRefresh';


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

  useEffect(() => {
    const fetchClubs = async () => {

        setLoading(true);
      const user = FIREBASE_AUTH.currentUser;
      if (!user) return;
  
      const currentUserId = user.uid;
  
      const clubsCollection = collection(FIRESTORE_INSTANCE, 'clubs');
      const clubsSnapshot = await getDocs(clubsCollection);
      const clubsData = clubsSnapshot.docs
        .filter((doc) => doc.data().createdBy === currentUserId) // Filter clubs by current user's ID
        .map((doc) => ({ id: doc.id, ...doc.data() }));
      
      setClubs(clubsData);
      setLoading(false);

    };
    refreshDataFromFirestore(setClubs);
    fetchClubs();
  }, []);

  return (
    <View style={{ padding: 20 }}>


      {loading ? (
            <ActivityIndicator size="large" color="#000ff"/>
        ) : (
        <>
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
            <Button onPress={handleNavigateToAddClub} title="Add Club" />
            {clubs.map((clubInfo) => (
            <ClubInfoContainer key={clubInfo.id} navigation={navigation} clubInfo={clubInfo} />
      ))}
        </>
        )}

      {/* Display club information containers */}

      {/* Other UI elements */}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
    clubContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
    },
    clubName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    clubLocation: {
      fontSize: 16,
    },
  });
