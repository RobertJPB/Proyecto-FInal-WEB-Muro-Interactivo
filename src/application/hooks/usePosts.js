// src/application/hooks/usePosts.js
import { useState, useEffect } from 'react';
import { postRepository } from '../services/ServiceContainer';
import {
  createPostUseCase,
  toggleLikeUseCase,
  deletePostUseCase,
} from '../services/ServiceContainer';
import toast from 'react-hot-toast';

/**
 * Hook para la gestión de publicaciones.
 * Cumple con la Regla 1: Visualización pública de todos los posts.
 */
export const usePosts = (currentUser) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suscripción en tiempo real a todos los posts (Acceso público)
    const unsubscribe = postRepository.subscribeToAllPosts(
      (updatedPosts) => {
        setPosts(updatedPosts);
        setLoading(false);
      },
      (error) => {
        console.error('Error en suscripción de posts:', error);
        toast.error('Error de acceso al servidor. Verifique las reglas de seguridad.');
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const createPost = async (contenido) => {
    if (!currentUser) return false;
    try {
      await createPostUseCase.execute({ contenido, autor: currentUser });
      toast.success('Publicación registrada correctamente.');
      return true;
    } catch (err) {
      toast.error('Error al crear la publicación: ' + err.message);
      return false;
    }
  };

  const toggleLike = async (postId) => {
    if (!currentUser) {
      toast.error('Se requiere inicio de sesión para realizar esta acción.');
      return;
    }
    try {
      await toggleLikeUseCase.execute({ postId, uid: currentUser.uid });
    } catch (err) {
      toast.error('Error al procesar la interacción: ' + err.message);
    }
  };

  const deletePost = async (post) => {
    if (!currentUser || currentUser.uid !== post.autorUid) return;
    try {
      await deletePostUseCase.execute({
        postId: post.id,
        uid: currentUser.uid,
        autorUid: post.autorUid,
      });
      toast.success('Publicación eliminada del registro.');
    } catch (err) {
      toast.error('Error al eliminar la publicación.');
    }
  };

  return { posts, loading, createPost, toggleLike, deletePost };
};
