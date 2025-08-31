
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
apiKey: "AIzaSyA5urPILuzjC2u0j7nWwus9g0njV4pLy08",
authDomain: "sports-buddy-app-37fff.firebaseapp.com",
projectId: "sports-buddy-app-37fff",
storageBucket: "sports-buddy-app-37fff.firebasestorage.app",
messagingSenderId: "108021286167",
appId: "1:108021286167:web:302cab2bf101d9441fe352"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app); 
const db = getFirestore(app); 

const analytics = getAnalytics(app);


export { app, auth, db, analytics };