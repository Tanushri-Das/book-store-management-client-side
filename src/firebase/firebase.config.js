// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_apiKey,
  // authDomain: process.env.NEXT_PUBLIC_authDomain,
  // projectId: process.env.NEXT_PUBLIC_projectId,
  // storageBucket:process.env.NEXT_PUBLIC_storageBucket,
  // messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  // appId: process.env.NEXT_PUBLIC_appId

  apiKey: "AIzaSyAg2Uyea0RZI2buKKLL8blSZnVUjWersng",
  authDomain: "book-store-6325d.firebaseapp.com",
  projectId: "book-store-6325d",
  storageBucket: "book-store-6325d.appspot.com",
  messagingSenderId: "986365552450",
  appId: "1:986365552450:web:9b00e7a8221c66f4dccadb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;