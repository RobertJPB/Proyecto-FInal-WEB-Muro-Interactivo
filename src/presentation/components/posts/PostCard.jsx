// src/presentation/components/posts/PostCard.jsx
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from '../../context/AuthContext';
import CommentSection from './CommentSection';

const PostCard = ({ post, onLike, onDelete }) => {
  const { currentUser } = useAuth();
  const isLiked = currentUser ? post.isLikedBy(currentUser.uid) : false;
  const isOwner = currentUser?.uid === post.autorUid;
  const [deleting, setDeleting] = useState(false);
  const [showComments, setShowComments] = useState(false);

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
        <div style={styles.authorSection}>
          <div style={styles.avatar}>
            {post.autorPhotoURL ? (
              <img src={post.autorPhotoURL} alt="Author" style={styles.avatarImg} />
            ) : (
              <span>{post.autorNombre ? post.autorNombre.charAt(0).toUpperCase() : '?'}</span>
            )}
          </div>
          <div style={styles.authorInfo}>
            <span style={styles.name}>{post.getNombreCompleto()}</span>
            <span style={styles.username}>@{post.autorUsername}</span>
          </div>
        </div>
        <span style={styles.date}>{fechaFormat}</span>
      </div>

      <div style={styles.body}>
        <p style={styles.content}>{post.contenido}</p>
      </div>

      <div style={styles.footer}>
        <div style={styles.mainActions}>
          <button
            onClick={() => onLike(post.id)}
            style={{
              ...styles.actionBtn,
              color: isLiked ? '#0055ff' : '#666',
              fontWeight: isLiked ? '600' : '400',
            }}
          >
            {isLiked ? 'Me gusta' : 'Me gusta'}
            {post.getLikesCount() > 0 && <span style={styles.counter}>({post.getLikesCount()})</span>}
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            style={{
              ...styles.actionBtn,
              color: showComments ? '#000' : '#666',
              fontWeight: showComments ? '600' : '400',
            }}
          >
            Comentar
          </button>
        </div>

        {isOwner && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={styles.deleteBtn}
          >
            {deleting ? 'Borrando...' : 'Eliminar'}
          </button>
        )}
      </div>

      {showComments && (
        <CommentSection postId={post.id} currentUser={currentUser} />
      )}
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
  authorSection: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  avatar: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    background: '#0055ff',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 700,
    overflow: 'hidden',
    flexShrink: 0,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  authorInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
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
  mainActions: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
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
