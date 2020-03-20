import * as firebase from 'firebase';

// const config = {
//   apiKey: 'you-api-key',
//   authDomain: '<project-id>.firebaseapp.com',
//   databaseURL: 'https://<project-id>.firebaseio.com',
//   storageBucket: '<project-id>.appspot.com'
// };






const config = {
  apiKey: "AIzaSyD66kOnBNK8T5TsKufnTNUQfIIJplRNeRw",
  authDomain: "doctordesh-edad9.firebaseapp.com",
  databaseURL: "https://doctordesh-edad9.firebaseio.com/",
  projectId: "DoctorDesh",
  storageBucket: "doctordesh-edad9.appspot.com"
};

firebase.initializeApp(config);

const database = firebase.database();

export {
  database,
};