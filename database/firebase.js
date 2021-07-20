import firebase from 'firebase'
import   'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCnZVmzJZkIaY-AMC1eAEzswD5FjTzWyNs",
    authDomain: "iris-1a85b.firebaseapp.com",
    projectId: "iris-1a85b",
    storageBucket: "iris-1a85b.appspot.com",
    messagingSenderId: "897306749419",
    appId: "1:897306749419:web:1887f7c1b795fb1b3cd1ae"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()

  export default {
    firebase,
    db
  }