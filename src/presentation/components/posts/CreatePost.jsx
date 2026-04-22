// src/presentation/components/posts/CreatePost.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const MAX_CHARS = 500;

const CreatePost = ({ onSubmit }) => {
  const { currentUser } = useAuth();
  const [contenido, setContenido] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const initial = currentUser.nombre ? currentUser.nombre.charAt(0).toUpperCase() : '?';

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
          <div />
          <span style={styles.user}>Identificado como: @{currentUser.username}</span>
        </div>

        <div style={styles.inputSection}>
          <div style={styles.avatar}>
            {currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt="User-Avatar" style={styles.avatarImg} />
            ) : (
              initial
            )}
          </div>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Escriba el contenido de su mensaje aquí..."
            style={{
              ...styles.textarea,
              borderBottomColor: isFocused ? '#0055ff' : '#e2e2e2'
            }}
            rows={3}
            disabled={loading}
          />
        </div>

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
    border: '1px solid #f0f0f0',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '40px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  label: {
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#999',
    letterSpacing: '1px',
  },
  user: {
    fontSize: '11px',
    color: '#bbb',
    fontWeight: '500',
  },
  inputSection: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#0055ff',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '700',
    flexShrink: 0,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  textarea: {
    width: '100%',
    padding: '4px 0',
    border: 'none',
    borderBottom: '2px solid #e2e2e2',
    fontSize: '18px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    resize: 'none',
    color: '#000',
    transition: 'border-color 0.2s ease',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px',
  },
  counter: {
    fontSize: '12px',
    fontWeight: '500',
  },
  btn: {
    background: '#000',
    color: '#fff',
    padding: '12px 32px',
    fontSize: '13px',
    fontWeight: '600',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'transform 0.1s ease',
  },
};

export default CreatePost;
