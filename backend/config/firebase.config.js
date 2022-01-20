import firebase from 'firebase';

//Configuration of firebase - used for social login

const firebaseConfig = {
    apiKey: "AIzaSyB9xYQsEsaHGnA_0eNN9_tU4y3SK2o4xGg",
    authDomain: "ommmeme-81476.firebaseapp.com",
    projectId: "ommmeme-81476",
    storageBucket: "ommmeme-81476.appspot.com",
    messagingSenderId: "194470619853",
    appId: "1:194470619853:web:f960222acc267da3bd9784"
  };

//Initialization of Firebase

firebase.initializeApp(firebaseConfig);

export default firebase;