// src/presentation/components/posts/CommentSection.jsx
import React, { useState } from 'react';
import { useComments } from '../../../application/hooks/useComments';
import CommentItem from './CommentItem';

const CommentSection = React.forwardRef(({ postId, currentUser, onCountChange, isForced }, ref) => {
  const { comments, loading, addComment, toggleLikeComment, deleteComment } = useComments(postId, currentUser);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    if (onCountChange) {
      onCountChange(comments.length);
    }
  }, [comments.length, onCountChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;
    
    setSubmitting(true);
    const success = await addComment(newComment);
    if (success) setNewComment('');
    setSubmitting(false);
  };

  if (!isForced && !loading && comments.length === 0) return null;

  return (
    <div style={styles.section}>
      <div style={styles.list}>
        {loading ? (
          <div style={styles.loading}>Cargando hilos...</div>
        ) : comments.length === 0 ? (
          <div style={styles.empty}>
            {currentUser ? 'Sé el primero en comentar.' : 'Aún no hay comentarios.'}
          </div>
        ) : (
          comments.map(c => (
            <CommentItem 
              key={c.id} 
              comment={c} 
              onLike={() => toggleLikeComment(c.id)}
              onDelete={() => deleteComment(c.id, c.autorUid)}
              currentUser={currentUser}
            />
          ))
        )}
      </div>

      {currentUser && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            ref={ref}
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe un comentario..."
            style={styles.input}
            disabled={submitting}
          />
          <button 
            type="submit" 
            style={styles.btn}
            disabled={!newComment.trim() || submitting}
          >
            {submitting ? '...' : 'Enviar'}
          </button>
        </form>
      )}
    </div>
  );
});

const styles = {
  section: {
    marginTop: '16px',
    padding: '16px',
    background: 'var(--bg-subtle)',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px',
  },
  loading: { fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' },
  empty: { fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '10px 0' },
  form: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    minWidth: 0,
    padding: '10px 16px',
    borderRadius: '20px',
    border: '1px solid var(--border)',
    fontSize: '13px',
    outline: 'none',
    background: 'var(--bg)',
    color: 'var(--text)',
  },
  btn: {
    flexShrink: 0,
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '10px 18px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    whiteSpace: 'nowrap',
  }
};

export default CommentSection;
