// src/presentation/components/posts/PostCard.jsx
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from '../../context/AuthContext';

const PostCard = ({ post, onLike, onDelete, index }) => {
  const { currentUser } = useAuth();
  const isLiked = currentUser ? post.isLikedBy(currentUser.uid) : false;
  const isOwner = currentUser?.uid === post.autorUid;
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(post);
    setDeleting(false);
  };

  const timeAgo = post.createdAt?.toDate
    ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true, locale: es })
    : 'recién';

  return (
    <article
      className="animate-fadeUp"
      style={{ ...styles.card, animationDelay: `${index * 0.08}s` }}
    >
      <div style={styles.header}>
        <div style={styles.meta}>
          <span style={styles.name}>{post.getNombreCompleto()}</span>
          <span style={styles.username}>@{post.autorUsername}</span>
        </div>
        <span style={styles.time}>{timeAgo}</span>
      </div>

      <p style={styles.content}>{post.contenido}</p>

      <div style={styles.footer}>
        <button
          onClick={() => onLike(post.id)}
          style={{
            ...styles.likeBtn,
            fontWeight: isLiked ? 700 : 400,
            color: isLiked ? '#000' : '#888',
          }}
        >
          {isLiked ? 'Te gusta' : 'Me gusta'}
          <span style={styles.count}>{post.getLikesCount() > 0 && post.getLikesCount()}</span>
        </button>

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
    </article>
  );
};

const styles = {
  card: {
    background: '#ffffff',
    borderBottom: '1px solid #f0f0f0',
    padding: '40px 0',
    transition: 'opacity 0.3s',
  },
  header: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  meta: {
    display: 'flex',
    gap: '12px',
    alignItems: 'baseline',
  },
  name: {
    fontFamily: 'Outfit, sans-serif',
    fontWeight: 600,
    fontSize: '16px',
    color: '#000000',
    textTransform: 'lowercase',
  },
  username: {
    fontSize: '13px',
    color: '#aaaaaa',
  },
  time: {
    fontSize: '11px',
    color: '#cccccc',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  content: {
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#111111',
    marginBottom: '24px',
    whiteSpace: 'pre-wrap',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  likeBtn: {
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  count: {
    fontSize: '11px',
    opacity: 0.6,
  },
  deleteBtn: {
    fontSize: '11px',
    color: '#dc3545',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    opacity: 0.6,
  },
};

export default PostCard;
