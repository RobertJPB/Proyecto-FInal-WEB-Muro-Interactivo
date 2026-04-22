// src/presentation/components/posts/CreatePost.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const MAX_CHARS = 500;

const CreatePost = ({ onSubmit }) => {
  const { currentUser } = useAuth();
  const [contenido, setContenido] = useState('');
  const [loading, setLoading] = useState(false);

  const remaining = MAX_CHARS - contenido.length;
  const isOverLimit = remaining < 0;
  const isEmpty = contenido.trim().length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty || isOverLimit) return;
    setLoading(true);
    const success = await onSubmit(contenido);
    if (success) setContenido('');
    setLoading(false);
  };

  if (!currentUser) return null;

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <header style={styles.header}>
        <span style={styles.username}>@{currentUser.username} está escribiendo...</span>
      </header>

      <textarea
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        placeholder="Escribe algo aquí."
        style={styles.textarea}
        rows={4}
        disabled={loading}
      />

      <footer style={styles.footer}>
        <span style={{ 
          ...styles.counter, 
          color: isOverLimit ? '#dc3545' : '#999999' 
        }}>
          {remaining} caracteres
        </span>
        <button
          type="submit"
          disabled={isEmpty || isOverLimit || loading}
          style={{
            ...styles.btn,
            opacity: (isEmpty || isOverLimit || loading) ? 0.3 : 1,
          }}
        >
          {loading ? 'Subiendo...' : 'Publicar'}
        </button>
      </footer>
    </form>
  );
};

const styles = {
  form: {
    background: '#ffffff',
    padding: '40px 0',
    borderBottom: '2px solid #000000',
    marginBottom: '40px',
  },
  header: {
    marginBottom: '16px',
  },
  username: {
    fontSize: '11px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
  },
  textarea: {
    width: '100%',
    background: 'transparent',
    border: 'none',
    padding: '0',
    color: '#000000',
    fontSize: '20px',
    fontFamily: 'Outfit, sans-serif',
    fontWeight: 400,
    lineHeight: 1.4,
    resize: 'none',
    outline: 'none',
    marginBottom: '20px',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counter: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  btn: {
    padding: '12px 32px',
    background: '#000000',
    color: '#ffffff',
    fontFamily: 'Outfit, sans-serif',
    fontWeight: 600,
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
  },
};

export default CreatePost;
