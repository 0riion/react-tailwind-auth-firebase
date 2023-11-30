import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'DIaaSfAzL_2jiVBhmiIUFGs2z4-cGF-Hgdsedh3k',
  authDomain: 'example-react.firebaseapp.com',
  databaseURL: 'https://example-react.firebaseio.com',
  projectId: 'example-react',
  storageBucket: 'example-react.appspot.com',
  messagingSenderId: '369173776768',
  appId: '1:369173776768:web:895ded916749deebd31965',
  measurementId: 'G-976YVMRB4R',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export {
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
};
