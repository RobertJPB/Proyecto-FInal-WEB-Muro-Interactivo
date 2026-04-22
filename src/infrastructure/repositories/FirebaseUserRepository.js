// src/infrastructure/repositories/FirebaseUserRepository.js
// Implementación concreta del repositorio de usuarios con Firebase

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import { User } from '../../domain/entities/User';

export class FirebaseUserRepository {
  constructor() {
    this.usersCollection = 'users';
  }

  async createUser({ username, nombre, apellido, email }, password) {
    // 1. Crear en Firebase Auth
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = credential.user.uid;

    // 2. Guardar datos extendidos en Firestore
    const userData = {
      username,
      nombre,
      apellido,
      email,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, this.usersCollection, uid), userData);

    return new User({ uid, ...userData, createdAt: new Date() });
  }

  async getUserById(uid) {
    const docRef = doc(db, this.usersCollection, uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return User.fromFirestore(docSnap.data(), uid);
  }

  async getUserByUsername(username) {
    const q = query(
      collection(db, this.usersCollection),
      where('username', '==', username)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const docSnap = querySnapshot.docs[0];
    return User.fromFirestore(docSnap.data(), docSnap.id);
  }

  async login(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return await this.getUserById(credential.user.uid);
  }

  async logout() {
    await signOut(auth);
  }

  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const user = await this.getUserById(firebaseUser.uid);
        callback(user);
      } else {
        callback(null);
      }
    });
  }
}
