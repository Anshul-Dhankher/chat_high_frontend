import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDb7nxWdphsye42IpkLkwNL8glmZXDFUvI",
  authDomain: "chatapp-71aa1.firebaseapp.com",
  projectId: "chatapp-71aa1",
  storageBucket: "chatapp-71aa1.appspot.com",
  messagingSenderId: "1017831714557",
  appId: "1:1017831714557:web:127905e0bcd01142671894",
  measurementId: "G-3Z2GJJD1GX",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
