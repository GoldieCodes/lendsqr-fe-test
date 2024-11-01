import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// The web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwhEZXm0JnrFrD_ox_cMzs_NZdp-dLnoI",
  authDomain: "onyinye-gold-lendsqr-fe-test.firebaseapp.com",
  projectId: "onyinye-gold-lendsqr-fe-test",
  storageBucket: "onyinye-gold-lendsqr-fe-test.firebasestorage.app",
  messagingSenderId: "148415946122",
  appId: "1:148415946122:web:da9f024cb7ba84358dfc73",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialized Firebase Authentication to get a reference to the service
export const auth = getAuth(app)
