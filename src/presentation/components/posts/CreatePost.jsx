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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.header}>
          <span style={styles.label}>Escribir un mensaje</span>
          <span style={styles.user}>Identificado como: @{currentUser.username}</span>
        </div>

        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Escriba el contenido de su mensaje aquí..."
          style={styles.textarea}
          rows={3}
          disabled={loading}
        />

        <div style={styles.footer}>
          <span style={{ 
            ...styles.counter, 
            color: isOverLimit ? '#d32f2f' : '#666' 
          }}>
            {remaining} caracteres disponibles
          </span>
          <button
            type="submit"
            disabled={isEmpty || isOverLimit || loading}
            style={{
              ...styles.btn,
              opacity: (isEmpty || isOverLimit || loading) ? 0.3 : 1,
            }}
          >
            {loading ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    background: '#ffffff',
    border: '1px solid #000',
    padding: '24px',
    marginBottom: '32px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  user: {
    fontSize: '12px',
    color: '#666',
  },
  textarea: {
    width: '100%',
    padding: '12px 0',
    border: 'none',
    borderBottom: '1px solid #e2e2e2',
    fontSize: '16px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    resize: 'none',
    marginBottom: '16px',
    color: '#000',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counter: {
    fontSize: '12px',
  },
  btn: {
    background: '#000',
    color: '#fff',
    padding: '10px 24px',
    fontSize: '13px',
    fontWeight: '600',
  },
};

export default CreatePost;
