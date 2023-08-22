import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getAuth} from 'firebase/auth';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDe7LT6k3TZVENTEv3xkX08J0vfvNd5y_U",
    authDomain: "reservate-692c7.firebaseapp.com",
    projectId: "reservate-692c7",
    storageBucket: "reservate-692c7.appspot.com",
    messagingSenderId: "182175651099",
    appId: "1:182175651099:web:233a844329302d67c36fbe",
    measurementId: "G-VEQDZXE4CV"
  };
  
  export const FIREBASE_APP = initializeApp(firebaseConfig);
  export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
  export const FIRESTORE_INSTANCE = getFirestore(FIREBASE_APP);

  export const STORAGE_INIT = getStorage(FIREBASE_APP);
  export const FIREBASE_STORAGE = ref(STORAGE_INIT, 'clubs/');

  export const getListOfImages = async () => {
    const storageList = listAll(FIREBASE_STORAGE);
    const res = await storageList;
  
    const imagePromises = res.items.map(async (item) => {
      const downloadURL = await getDownloadURL(item);
      return downloadURL;
    });
  
    return Promise.all(imagePromises);
  };
  
  