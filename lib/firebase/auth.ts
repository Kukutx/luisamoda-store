import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User as FirebaseUser,
  onAuthStateChanged,
  Auth,
} from 'firebase/auth';
import { auth, db, app } from './config';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { User } from '@/types';

const isAuthActive = !!app && !!auth;

export const registerUser = async (
  email: string,
  password: string,
  displayName?: string
): Promise<FirebaseUser> => {
  if (!isAuthActive || !auth) throw new Error('Authentication system is currently offline.');
  const userCredential = await createUserWithEmailAndPassword(auth as Auth, email, password);
  const user = userCredential.user;

  if (displayName) {
    await updateProfile(user, { displayName });
  }

  if (db) {
    const userData: Omit<User, 'id'> = {
      email: user.email!,
      displayName: displayName || user.displayName || undefined,
      photoURL: user.photoURL || undefined,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(doc(db, 'users', user.uid), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  return user;
};

export const loginUser = async (email: string, password: string): Promise<FirebaseUser> => {
  if (!isAuthActive || !auth) throw new Error('Authentication system is currently offline.');
  const userCredential = await signInWithEmailAndPassword(auth as Auth, email, password);
  return userCredential.user;
};

export const logoutUser = async (): Promise<void> => {
  if (!isAuthActive || !auth) return;
  await signOut(auth as Auth);
};

export const getCurrentUser = (): FirebaseUser | null => {
  if (!isAuthActive || !auth) return null;
  return auth.currentUser;
};

export const onAuthChange = (callback: (user: FirebaseUser | null) => void) => {
  if (!isAuthActive || !auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth as Auth, callback);
};

export const getUserData = async (userId: string): Promise<User | null> => {
  if (!isAuthActive || !db) return null;
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() } as User;
    }
  } catch (error) {
    return null;
  }
  return null;
};
