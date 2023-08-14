import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_INSTANCE } from './FirebaseConfig';
const refreshDataFromFirestore = async (setDataCallback) => {
  try {
    const clubsCollection = collection(FIRESTORE_INSTANCE, 'clubs');
    const clubsSnapshot = await getDocs(clubsCollection);
    const clubsData = clubsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setDataCallback(clubsData);
  } catch (error) {
    console.error('Error refreshing data from Firestore:', error);
  }
};

export default refreshDataFromFirestore;
