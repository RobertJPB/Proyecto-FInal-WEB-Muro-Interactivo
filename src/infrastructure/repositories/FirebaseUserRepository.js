// src/infrastructure/repositories/FirebaseUserRepository.js
// Implementación concreta del repositorio de usuarios con Firebase

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
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
  updateDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase/firebaseConfig';
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

  async updateProfile(uid, { nombre, apellido, photoFile }) {
    let photoURL = null;

    if (photoFile) {
      const storageRef = ref(storage, `avatars/${uid}`);
      await uploadBytes(storageRef, photoFile);
      photoURL = await getDownloadURL(storageRef);
    }

    const userRef = doc(db, this.usersCollection, uid);
    const updates = { nombre, apellido };
    if (photoURL) updates.photoURL = photoURL;

    await updateDoc(userRef, updates);
    return await this.getUserById(uid);
  }

  async login(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return await this.getUserById(credential.user.uid);
  }
  
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const { user } = result;

    // Verificar si el usuario ya existe en Firestore
    const existingUser = await this.getUserById(user.uid);
    if (!existingUser) {
      // Crear perfil por defecto para usuario de Google
      const username = user.email.split('@')[0];
      const displayName = user.displayName || 'Usuario Google';
      const parts = displayName.split(' ');
      const nombre = parts[0] || 'Nombre';
      const apellido = parts.slice(1).join(' ') || 'Apellido';

      const userData = {
        username,
        nombre,
        apellido,
        email: user.email,
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, this.usersCollection, user.uid), userData);
      return new User({ uid: user.uid, ...userData, createdAt: new Date() });
    }

    return existingUser;
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
