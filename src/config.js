import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD_0f2BxQiqa4V-7jXbtC-felwEBEaSfDw",
  authDomain: "otstaff-30f4d.firebaseapp.com",
  databaseURL: "https://otstaff-30f4d-default-rtdb.firebaseio.com",
  projectId: "otstaff-30f4d",
  storageBucket: "otstaff-30f4d.appspot.com",
  messagingSenderId: "747264131172",
  appId: "1:747264131172:web:a7dcfea38e437d463bdf71",
  measurementId: "G-2XFWYJBK42"
};

export const firebaseapp = Firebase.initializeApp(firebaseConfig);

var db;
export function fbAuthenticated() {
  db = firebaseapp.database();
}
export function getfirebasedb() {
  return db;
}

