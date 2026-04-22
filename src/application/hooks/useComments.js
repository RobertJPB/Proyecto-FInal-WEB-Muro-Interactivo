// src/application/hooks/useComments.js
import { useState, useEffect } from 'react';
import { addCommentUseCase, subscribeToCommentsUseCase } from '../services/ServiceContainer';
import toast from 'react-hot-toast';

export const useComments = (postId, currentUser) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const unsubscribe = subscribeToCommentsUseCase.execute(
      postId,
      (newComments) => {
        setComments(newComments);
        setLoading(false);
      },
      (error) => {
        console.error('Error suscribiéndose a comentarios:', error);
        toast.error('No se pudieron cargar los comentarios.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [postId]);

  const addComment = async (contenido) => {
    try {
      await addCommentUseCase.execute(postId, { contenido, autor: currentUser });
      return true;
    } catch (err) {
      toast.error(err.message || 'Error al enviar comentario');
      return false;
    }
  };

  return { comments, loading, addComment };
};
