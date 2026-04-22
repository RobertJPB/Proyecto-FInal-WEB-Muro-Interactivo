// src/presentation/components/posts/PostCard.jsx
import React, { useState, useRef } from 'react';
import { formatTimeAgo } from '../../utils/formatTimeAgo';
import { useAuth } from '../../context/AuthContext';
import CommentSection from './CommentSection';

const PostCard = ({ post, onLike, onDelete }) => {
  const { currentUser } = useAuth();
  const isLiked = currentUser ? post.isLikedBy(currentUser.uid) : false;
  const isOwner = currentUser?.uid === post.autorUid;
  const [deleting, setDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const commentInputRef = useRef(null);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleCommentFocus = () => {
    setIsExpanded(true);
    // Usar setTimeout para esperar al renderizado si estaba oculto
    setTimeout(() => {
      if (commentInputRef.current) {
        commentInputRef.current.focus();
      }
    }, 50);
  };

  const handleDelete = async () => {
    setShowConfirm(false);
    setDeleting(true);
    await onDelete(post);
    setDeleting(false);
  };

  const fechaFormat = formatTimeAgo(post.createdAt);

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
              color: isLiked ? 'var(--accent)' : 'var(--text-muted)',
              fontWeight: isLiked ? '700' : '500',
              gap: '4px',
            }}
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill={isLiked ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>{isLiked ? 'Me gusta' : 'Me gusta'}</span>
            {post.getLikesCount() > 0 && <span style={styles.counter}>{post.getLikesCount()}</span>}
          </button>

          <button
            onClick={handleCommentFocus}
            style={styles.actionBtn}
          >
            Comentar
          </button>
        </div>

        {isOwner && !showConfirm && (
          <button
            onClick={() => setShowConfirm(true)}
            disabled={deleting}
            style={styles.deleteBtn}
          >
            {deleting ? 'Borrando...' : 'Eliminar'}
          </button>
        )}

        {isOwner && showConfirm && (
          <div style={styles.confirmInline}>
            <span style={styles.confirmText}>¿Borrar publicación?</span>
            <button onClick={handleDelete} style={styles.confirmBtnYes}>Sí</button>
            <button onClick={() => setShowConfirm(false)} style={styles.confirmBtnNo}>No</button>
          </div>
        )}
      </div>

      <CommentSection 
        ref={commentInputRef}
        postId={post.id} 
        currentUser={currentUser} 
        onCountChange={setCommentCount}
        isForced={isExpanded}
      />
    </div>
  );
};

const styles = {
  card: {
    background: 'var(--bg-subtle)',
    border: '1px solid var(--border)',
    padding: '20px 16px',
    marginBottom: '12px',
    borderRadius: 'var(--radius)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    gap: '8px',
  },
  authorSection: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  avatar: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    background: 'var(--accent)',
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
    minWidth: 0,
  },
  name: {
    fontWeight: '600',
    fontSize: '15px',
    color: 'var(--text)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  username: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  date: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    paddingTop: '2px',
  },
  body: {
    marginBottom: '20px',
  },
  content: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: 'var(--text)',
    whiteSpace: 'pre-wrap',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid var(--border)',
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
    color: 'var(--text-muted)',
  },
  counter: {
    marginLeft: '4px',
  },
  deleteBtn: {
    fontSize: '13px',
    color: '#ff4d4f',
  },
  confirmInline: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 8px',
    background: 'rgba(255, 77, 79, 0.1)',
    borderRadius: '4px',
  },
  confirmText: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#ff4d4f',
  },
  confirmBtnYes: {
    background: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  confirmBtnNo: {
    background: 'transparent',
    color: 'var(--text-muted)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    padding: '3px 10px',
    fontSize: '12px',
    cursor: 'pointer',
  },
};

export default PostCard;
