import firebase from 'firebase/app'
import 'firebase/firestore'

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSiiXifOVtENYv86X6hRhucLZdASKlI_E",
    authDomain: "crud-udemy-react-29db5.firebaseapp.com",
    databaseURL: "https://crud-udemy-react-29db5.firebaseio.com",
    projectId: "crud-udemy-react-29db5",
    storageBucket: "crud-udemy-react-29db5.appspot.com",
    messagingSenderId: "162787955192",
    appId: "1:162787955192:web:9b4aa870f22506f6c7060d"
};
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 export {firebase}