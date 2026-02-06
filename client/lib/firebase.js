// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj9JX0249_OPQi8E0FdeJpOG8gWjWpblU",
  authDomain: "vanua-academy.firebaseapp.com",
  projectId: "vanua-academy",
  storageBucket: "vanua-academy.firebasestorage.app",
  messagingSenderId: "712468960712",
  appId: "1:712468960712:web:8912bca6975119dd9f9cfd",
  measurementId: "G-8XT1K5QNX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only initialize analytics in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Export app for use in other components
export { app };