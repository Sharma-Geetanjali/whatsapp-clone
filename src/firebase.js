import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA-PhVWf9YyT9O-F3ermHMxpXEOUqfzlMQ",
    authDomain: "whatsapp-clone-dd66d.firebaseapp.com",
    projectId: "whatsapp-clone-dd66d",
    storageBucket: "whatsapp-clone-dd66d.appspot.com",
    messagingSenderId: "433822116326",
    appId: "1:433822116326:web:8b968692a837b46e14ce27"
  };
  
  //connects everything
  const firebaseApp= firebase.initializeApp(firebaseConfig);

  export const db =firebaseApp.firestore();

  export const auth= firebase.auth();

   const provider = new firebase.auth.GoogleAuthProvider();
   export {provider}