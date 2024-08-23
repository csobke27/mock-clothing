import  { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdNFT8HMtkLUGMBoBJL5uvkyqHQaXFIBg",
    authDomain: "crwn-clothing-db-b6f4b.firebaseapp.com",
    projectId: "crwn-clothing-db-b6f4b",
    storageBucket: "crwn-clothing-db-b6f4b.appspot.com",
    messagingSenderId: "1028231555029",
    appId: "1:1028231555029:web:d987c08e4ada9f88163f5c"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    // if userAuth is not provided, do not continue.
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    // if user data does not exists
    if(!userSnapshot.exists()){
        // create / set the doc with the data from the userAuth in collection
        // get the displayName and email from userAuth
        const { displayName, email} = userAuth;
        // get current date for date created
        const createdAt = new Date();

        try{
            setDoc(userDocRef, {displayName, email, createdAt, ...additionalInfo});
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    // if email or password are not provided, do not continue.
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
  }