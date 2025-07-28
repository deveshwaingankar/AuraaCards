// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import {
  getFirestore
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

// Auth + Firestore instances
export const auth = getAuth(app);
export const db   = getFirestore(app);

// 1) Force local persistence
setPersistence(auth, browserLocalPersistence).catch(err => {
  console.error("❌ could not set persistence", err);
});

// Helper wrappers
export function onAuthChange(cb) {
  return onAuthStateChanged(auth, cb);
}
export function doSignOut() {
  return signOut(auth);
}
export function doSignIn(email, pwd) {
  return signInWithEmailAndPassword(auth, email, pwd);
}
export async function doSignUp(email, pwd, profile) {
  const { user } = await createUserWithEmailAndPassword(auth, email, pwd);
  await setDoc(doc(db, "users", user.uid), {
    uid:       user.uid,
    email:     email,
    fullName:  profile.fullName,
    phone:     profile.phone || "",
    createdAt: Date.now(),
  });
  return user;
}
export async function fetchUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

