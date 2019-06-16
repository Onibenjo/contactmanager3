import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseReducer } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";

//Reducers
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

//Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDdbRqNHm-ASJl0H-oWoQ4wrsyZ1RRJ6zo",
  authDomain: "clientpanel-f5473.firebaseapp.com",
  databaseURL: "https://clientpanel-f5473.firebaseio.com",
  projectId: "clientpanel-f5473",
  storageBucket: "clientpanel-f5473.appspot.com",
  messagingSenderId: "301984977300"
};

//React Redux Firebase Config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

//Initialize the firebase config
firebase.initializeApp(firebaseConfig);
//Intiialize firestore
firebase.firestore();
// const firestore = firebase.firestore();

//Ading firebase and firestore to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

//Check for settings in Local Storage
if (localStorage.getItem('settings') === null) {
  //Default settings
  const defaultSettings = {
    disableBalOnAdd: true,
    disableBalOnEdit: false,
    allowReg: false
  }

  //Set to localstorage
  //Loalstorage only accepts strings so we have to 
  //convert it to a json string literal
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

//Initial state
//We have to parse it back to an object
const initState = { settings: JSON.parse(localStorage.getItem('settings')) };

//Create store
const store = createStore(
  rootReducer,
  initState,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

export default store;