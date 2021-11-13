import { initializeApp } from "firebase/app";
import { getStorage, ref,uploadBytes,  getDownloadURL  } from "firebase/storage";
import { getFirestore , doc, setDoc, getDoc,collection, query, where,addDoc, getDocs} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword ,onAuthStateChanged,  signOut  } from "firebase/auth"



const firebaseConfig = {
    apiKey: "AIzaSyAB4DcL_bvFEq3E_bse3xq08EEWF8grb-A",
    authDomain: "hackathon-f0c63.firebaseapp.com",
    projectId: "hackathon-f0c63",
    storageBucket: "hackathon-f0c63.appspot.com",
    messagingSenderId: "350684685223",
    appId: "1:350684685223:web:13d471e25892152f2f8c82",
    measurementId: "G-04CH4SLTMX"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const storageRef = ref(storage);

  export {

   auth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   onAuthStateChanged,
   signOut,
   db,
   doc,
   setDoc,
   collection,
   getDoc,
   storage,
   storageRef,
   uploadBytes ,
   getDownloadURL,
   ref,
   query,
   getDocs,
   where, 
   addDoc
  }
