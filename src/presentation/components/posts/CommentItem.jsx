// src/presentation/components/posts/CommentItem.jsx
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const CommentItem = ({ comment }) => {
  const fechaFormat = comment.createdAt?.toDate
    ? formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true, locale: es })
    : 'hace un momento';

  return (
    <div style={styles.item}>
      <div style={styles.avatar}>
        {comment.autorPhotoURL ? (
          <img src={comment.autorPhotoURL} alt="Author" style={styles.avatarImg} />
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
      </div>
    </div>
  );
};

const styles = {
  item: {
    display: 'flex',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid #f9f9f9',
  },
  avatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: '#0055ff',
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
  },
  header: {
    display: 'flex',
    gap: '8px',
    alignItems: 'baseline',
    marginBottom: '2px',
  },
  name: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#000',
  },
  date: {
    fontSize: '10px',
    color: '#aaa',
  },
  text: {
    fontSize: '13px',
    color: '#333',
    lineHeight: '1.4',
    margin: 0,
  },
};

export default CommentItem;
