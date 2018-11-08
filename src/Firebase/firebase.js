import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const config = {
  apiKey: "AIzaSyDThNiKP9fOAusAXdws-BnLLjKQmzmz7OY",
  authDomain: "todo-app-with-hooks.firebaseapp.com",
  databaseURL: "https://todo-app-with-hooks.firebaseio.com",
  projectId: "todo-app-with-hooks",
  storageBucket: "todo-app-with-hooks.appspot.com",
  messagingSenderId: "114883808702"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase;
export const authSocial = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
