import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Paste your Firebase config here from Firebase Console
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

console.log('Firebase initialized');
try {
  const app = initializeApp(firebaseConfig);
  console.log('Firebase connected successfully');
} catch (error) {
  console.error('Firebase connection error:', error);
}

export const auth = getAuth(app);
export const db = getFirestore(app);

function App() {
  console.log('App component rendering');
  return (
    // ... rest of your code
  );
}