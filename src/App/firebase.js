import firebase from "firebase/app"
import "firebase/auth"

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyDQpcqA6RFh5mKIWPGALN-170JPAJT_65k",
    authDomain: "unichat-8da7b.firebaseapp.com",
    projectId: "unichat-8da7b",
    storageBucket: "unichat-8da7b.appspot.com",
    messagingSenderId: "46815113765",
    appId: "1:46815113765:web:ad30172188f984a7a605cc",
  })
  .auth()
