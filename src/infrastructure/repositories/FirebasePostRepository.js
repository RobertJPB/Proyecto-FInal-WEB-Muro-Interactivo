// src/infrastructure/repositories/FirebasePostRepository.js
// Implementación concreta del repositorio de posts con Firebase Firestore

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
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
import { Comment } from '../../domain/entities/Comment';

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
    const postSnap = await getDoc(postRef);
    const currentLikes = postSnap.data()?.likes || [];

    if (currentLikes.includes(uid)) {
      await updateDoc(postRef, { likes: arrayRemove(uid) });
    } else {
      await updateDoc(postRef, { likes: arrayUnion(uid) });
    }
  }

  async addComment(postId, commentData) {
    const commentsCol = collection(db, this.postsCollection, postId, 'comments');
    const docRef = await addDoc(commentsCol, {
      ...commentData,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...commentData };
  }

  async toggleCommentLike(postId, commentId, uid) {
    const commentRef = doc(db, this.postsCollection, postId, 'comments', commentId);
    const commentSnap = await getDoc(commentRef);
    const currentLikes = commentSnap.data()?.likes || [];

    if (currentLikes.includes(uid)) {
      await updateDoc(commentRef, { likes: arrayRemove(uid) });
    } else {
      await updateDoc(commentRef, { likes: arrayUnion(uid) });
    }
  }

  async deleteComment(postId, commentId) {
    const commentRef = doc(db, this.postsCollection, postId, 'comments', commentId);
    await deleteDoc(commentRef);
  }

  subscribeToComments(postId, callback, onError) {
    const commentsCol = collection(db, this.postsCollection, postId, 'comments');
    const q = query(commentsCol, orderBy('createdAt', 'asc'));
    
    return onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map(doc => Comment.fromFirestore(doc));
      callback(comments);
    }, onError);
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
