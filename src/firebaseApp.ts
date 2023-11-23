import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

type firebaseConfigType = {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
}

const firebaseConfig: firebaseConfigType = {
  apiKey: "AIzaSyCmRd-vk61aEfh_mmgWPoffMT2ivn2JNjg",
  authDomain: "todo2-b407c.firebaseapp.com",
  projectId: "todo2-b407c",
  storageBucket: "todo2-b407c.appspot.com",
  messagingSenderId: "728261260425",
  appId: "1:728261260425:web:9cf66c5a37f4fdb63e8258"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db, auth};