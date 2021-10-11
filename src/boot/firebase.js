import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyDGZVm_izXbqY914o9bPDCyNmnHrY1ZdO4",
  authDomain: "shopping-list-5b90d.firebaseapp.com",
  projectId: "shopping-list-5b90d",
  storageBucket: "shopping-list-5b90d.appspot.com",
  messagingSenderId: "332295513817",
  appId: "1:332295513817:web:0ff37dec543b72ea9400c8",
  measurementId: "G-0GNX9RK8GP"
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const db = getFirestore()

export default db
