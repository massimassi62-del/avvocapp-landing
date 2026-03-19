import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Import the Firebase configuration
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Helper for Google Sign-In
export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

// Helper for Email/Password Sign-In
export const loginWithEmail = (email: string, pass: string) => signInWithEmailAndPassword(auth, email, pass);

// Helper for Password Update
export const changeUserPassword = async (currentPass: string, newPass: string) => {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error("Utente non autenticato");
  
  const credential = EmailAuthProvider.credential(user.email, currentPass);
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, newPass);
};

// Helper for File Upload to Storage
export const uploadFileToStorage = async (file: File, path: string) => {
  console.log(`Inizio caricamento file: ${file.name} su ${path}`);
  try {
    const fileRef = ref(storage, path);
    const snapshot = await uploadBytes(fileRef, file);
    console.log('File caricato con successo, recupero URL...');
    const url = await getDownloadURL(snapshot.ref);
    console.log(`URL recuperato: ${url}`);
    return url;
  } catch (error) {
    console.error('Errore durante il caricamento su Firebase Storage:', error);
    throw error;
  }
};

export const logout = () => signOut(auth);

// Validate Connection to Firestore
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. ");
    }
    // Skip logging for other errors, as this is simply a connection test.
  }
}
testConnection();
