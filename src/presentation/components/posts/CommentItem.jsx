// src/presentation/components/posts/CommentItem.jsx
import React, { useState } from 'react';
import { formatTimeAgo } from '../../utils/formatTimeAgo';

const CommentItem = ({ comment, onLike, onDelete, currentUser }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const isLiked = currentUser ? comment.isLikedBy(currentUser.uid) : false;
  const isOwner = currentUser?.uid === comment.autorUid;

  const fechaFormat = formatTimeAgo(comment.createdAt);

  return (
    <div style={styles.item}>
      <div style={styles.avatar}>
        {((isOwner && currentUser?.photoURL) || comment.autorPhotoURL) ? (
          <img 
            src={(isOwner && currentUser?.photoURL) ? currentUser.photoURL : comment.autorPhotoURL} 
            alt="Author" 
            style={styles.avatarImg} 
          />
        ) : (
          <span>{comment.autorNombre ? comment.autorNombre.charAt(0).toUpperCase() : '?'}</span>
        )}
      </div>
      <div style={styles.contentWrap}>
        <div style={styles.header}>
          <span style={styles.name}>{comment.getNombreCompleto()}</span>
          <span style={styles.date}>{fechaFormat}</span>
        </div>
        <p style={styles.text}>{comment.contenido}</p>
        
        <div style={styles.actions}>
          <button 
            onClick={onLike} 
            style={{ 
              ...styles.likeBtn, 
              color: isLiked ? 'var(--accent)' : 'var(--text-muted)',
              fontWeight: isLiked ? '600' : '400'
            }}
          >
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 24 24" 
              fill={isLiked ? 'currentColor' : 'none'} 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>Me gusta</span>
            {comment.getLikesCount() > 0 && <span style={styles.counter}>{comment.getLikesCount()}</span>}
          </button>

          {isOwner && !showConfirm && (
            <button
              onClick={() => setShowConfirm(true)}
              style={styles.deleteBtn}
              title="Eliminar comentario"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
              <span>Eliminar</span>
            </button>
          )}

          {isOwner && showConfirm && (
            <div style={styles.confirmInline}>
              <span style={styles.confirmText}>¿Borrar?</span>
              <button onClick={onDelete} style={styles.confirmBtnYes}>Sí</button>
              <button onClick={() => setShowConfirm(false)} style={styles.confirmBtnNo}>No</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  item: {
    display: 'flex',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid var(--border)',
  },
  avatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'var(--accent)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 700,
    overflow: 'hidden',
    flexShrink: 0,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  contentWrap: {
    flex: 1,
    minWidth: 0,
  },
  header: {
    display: 'flex',
    gap: '6px',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    rowGap: '1px',
    marginBottom: '2px',
  },
  name: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text)',
  },
  date: {
    fontSize: '10px',
    color: 'var(--text-muted)',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    marginLeft: 'auto',
  },
  text: {
    fontSize: '13px',
    color: 'var(--text)',
    lineHeight: '1.4',
    margin: '0 0 4px 0',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginTop: '4px',
  },
  likeBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    padding: '4px 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  counter: {
    fontSize: '11px',
    marginLeft: '2px',
  },
  deleteBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11px',
    padding: '4px 0',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#ff4d4f',
    transition: 'opacity 0.2s',
  },
  confirmInline: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '2px 6px',
    background: 'rgba(255, 77, 79, 0.1)',
    borderRadius: '4px',
  },
  confirmText: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#ff4d4f',
  },
  confirmBtnYes: {
    background: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    padding: '2px 8px',
    fontSize: '10px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  confirmBtnNo: {
    background: 'transparent',
    color: 'var(--text-muted)',
    border: '1px solid var(--border)',
    borderRadius: '3px',
    padding: '2px 8px',
    fontSize: '10px',
    cursor: 'pointer',
  },
};

export default CommentItem;
