// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);

// — Helper functions —

export function onAuthChange(cb) {
  return onAuthStateChanged(auth, cb);
}

export function doSignOut() {
  return signOut(auth);
}

export function doSignIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function doSignUp(email, password, profile) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const { user } = result;
  await setDoc(doc(db, "users", user.uid), {
    uid:      user.uid,
    email:    user.email,
    fullName: profile.fullName,
    phone:    profile.phone || "",
    createdAt: Date.now(),
  });
  return user;
}

export async function fetchUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}
