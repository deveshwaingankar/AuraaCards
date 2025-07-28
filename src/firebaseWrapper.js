import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig"

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

function convertDate() {
    const now = new Date(Date.now()); // Create a Date object from the timestamp
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, add 1, then pad with leading zero if needed
    const day = String(now.getDate()).padStart(2, '0'); // Pad with leading zero if needed

    return `${year}-${month}-${day}`;
}
export async function fetchUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

