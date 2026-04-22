// src/infrastructure/repositories/FirebasePostRepository.js
// Implementación concreta del repositorio de posts con Firebase Firestore

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Post } from '../../domain/entities/Post';

export class FirebasePostRepository {
  constructor() {
    this.postsCollection = 'posts';
  }

  async getAllPosts() {
    const q = query(
      collection(db, this.postsCollection),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => Post.fromFirestore(doc));
  }

  async createPost(postData) {
    const docRef = await addDoc(collection(db, this.postsCollection), {
      ...postData,
      createdAt: serverTimestamp(),
    });
    return new Post({ id: docRef.id, ...postData });
  }

  async deletePost(postId) {
    await deleteDoc(doc(db, this.postsCollection, postId));
  }

  async toggleLike(postId, uid) {
    const postRef = doc(db, this.postsCollection, postId);
    // Se obtiene el post actual para saber si ya dio like
    const { getDoc } = await import('firebase/firestore');
    const postSnap = await getDoc(postRef);
    const currentLikes = postSnap.data()?.likes || [];

    if (currentLikes.includes(uid)) {
      await updateDoc(postRef, { likes: arrayRemove(uid) });
    } else {
      await updateDoc(postRef, { likes: arrayUnion(uid) });
    }
  }

  subscribeToAllPosts(callback, onError) {
    const q = query(
      collection(db, this.postsCollection),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => Post.fromFirestore(doc));
      callback(posts);
    }, onError);
  }
}
