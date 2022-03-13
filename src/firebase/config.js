import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCW4WNTNm_4JxuP3ugdT0deVLUpH95Kv00",
  authDomain: "watch3gether-fd262.firebaseapp.com",
  projectId: "watch3gether-fd262",
  storageBucket: "watch3gether-fd262.appspot.com",
  messagingSenderId: "592869606427",
  appId: "1:592869606427:web:fdf977578c172a736424be"
};

// init firebase
initializeApp(firebaseConfig)

// init firestore
const db = getFirestore()

export { db }