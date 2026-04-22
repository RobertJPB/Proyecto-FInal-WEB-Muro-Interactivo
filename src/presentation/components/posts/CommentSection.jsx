// src/presentation/components/posts/CommentSection.jsx
import React, { useState } from 'react';
import { useComments } from '../../../application/hooks/useComments';
import CommentItem from './CommentItem';

const CommentSection = React.forwardRef(({ postId, currentUser }, ref) => {
  const { comments, loading, addComment } = useComments(postId, currentUser);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;
    
    setSubmitting(true);
    const success = await addComment(newComment);
    if (success) setNewComment('');
    setSubmitting(false);
  };

  return (
    <div style={styles.section}>
      <div style={styles.list}>
        {loading ? (
          <div style={styles.loading}>Cargando hilos...</div>
        ) : comments.length === 0 ? (
          <div style={styles.empty}>Sé el primero en comentar.</div>
        ) : (
          comments.map(c => <CommentItem key={c.id} comment={c} />)
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
    background: '#fcfcfc',
    borderRadius: '12px',
    border: '1px solid #f0f0f0',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px',
  },
  loading: { fontSize: '12px', color: '#999', textAlign: 'center' },
  empty: { fontSize: '12px', color: '#bbb', textAlign: 'center', padding: '10px 0' },
  form: {
    display: 'flex',
    gap: '8px',
  },
  input: {
    flex: 1,
    padding: '10px 16px',
    borderRadius: '20px',
    border: '1px solid #e1e1e1',
    fontSize: '13px',
    outline: 'none',
    background: '#fff',
  },
  btn: {
    background: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '0 16px',
    fontSize: '11px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  }
};

export default CommentSection;
