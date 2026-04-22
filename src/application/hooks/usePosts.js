// src/application/hooks/usePosts.js
import { useState, useEffect } from 'react';
import { postRepository } from '../services/ServiceContainer';
import {
  createPostUseCase,
  toggleLikeUseCase,
  deletePostUseCase,
} from '../services/ServiceContainer';
import toast from 'react-hot-toast';

export const usePosts = (currentUser) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = postRepository.subscribeToAllPosts((updatedPosts) => {
      setPosts(updatedPosts);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const createPost = async (contenido) => {
    try {
      await createPostUseCase.execute({ contenido, autor: currentUser });
      toast.success('¡Publicación creada!');
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  const toggleLike = async (postId) => {
    if (!currentUser) {
      toast.error('Debes iniciar sesión para dar like.');
      return;
    }
    try {
      await toggleLikeUseCase.execute({ postId, uid: currentUser.uid });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deletePost = async (post) => {
    try {
      await deletePostUseCase.execute({
        postId: post.id,
        uid: currentUser?.uid,
        autorUid: post.autorUid,
      });
      toast.success('Post eliminado.');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return { posts, loading, createPost, toggleLike, deletePost };
};
