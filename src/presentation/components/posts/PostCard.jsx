// src/presentation/components/posts/PostCard.jsx
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from '../../context/AuthContext';

const PostCard = ({ post, onLike, onDelete }) => {
  const { currentUser } = useAuth();
  const isLiked = currentUser ? post.isLikedBy(currentUser.uid) : false;
  const isOwner = currentUser?.uid === post.autorUid;
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('¿Está seguro de que desea eliminar este mensaje?')) {
      setDeleting(true);
      await onDelete(post);
      setDeleting(false);
    }
  };

  const fechaFormat = post.createdAt?.toDate
    ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true, locale: es })
    : 'hace un momento';

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.authorInfo}>
          <span style={styles.name}>{post.getNombreCompleto()}</span>
          <span style={styles.username}>@{post.autorUsername}</span>
        </div>
        <span style={styles.date}>{fechaFormat}</span>
      </div>

      <div style={styles.body}>
        <p style={styles.content}>{post.contenido}</p>
      </div>

      <div style={styles.footer}>
        <button
          onClick={() => onLike(post.id)}
          style={{
            ...styles.actionBtn,
            color: isLiked ? '#000' : '#666',
            fontWeight: isLiked ? '600' : '400',
          }}
        >
          {isLiked ? 'Me gusta (Confirmado)' : 'Marcar como útil'}
          {post.getLikesCount() > 0 && <span style={styles.counter}>({post.getLikesCount()})</span>}
        </button>

        {isOwner && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={styles.deleteBtn}
          >
            {deleting ? 'Procesando...' : 'Eliminar publicación'}
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: '#ffffff',
    border: '1px solid #e2e2e2',
    padding: '24px',
    marginBottom: '16px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  authorInfo: {
    display: 'flex',
    gap: '8px',
    alignItems: 'baseline',
  },
  name: {
    fontWeight: '600',
    fontSize: '15px',
    color: '#000',
  },
  username: {
    fontSize: '13px',
    color: '#8e8e93',
  },
  date: {
    fontSize: '12px',
    color: '#ababab',
  },
  body: {
    marginBottom: '20px',
  },
  content: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#1a1a1a',
    whiteSpace: 'pre-wrap',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #f5f5f5',
    paddingTop: '16px',
  },
  actionBtn: {
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  counter: {
    marginLeft: '4px',
  },
  deleteBtn: {
    fontSize: '13px',
    color: '#d32f2f',
  },
};

export default PostCard;
