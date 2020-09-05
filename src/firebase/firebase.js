import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
	apiKey: "AIzaSyA-m0eXdvxZptwfzeyA1-xUz_6bVrOlaRY",
	authDomain: "pokemon-react-c9f17.firebaseapp.com",
	databaseURL: "https://pokemon-react-c9f17.firebaseio.com",
	projectId: "pokemon-react-c9f17",
	storageBucket: "pokemon-react-c9f17.appspot.com",
	messagingSenderId: "292297189625",
	appId: "1:292297189625:web:ef63101680071357251a28"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
	db,
	googleAuthProvider,
	firebase
}