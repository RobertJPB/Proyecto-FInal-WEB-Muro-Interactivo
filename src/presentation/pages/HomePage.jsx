// src/presentation/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../../application/hooks/usePosts';
import PostCard from '../components/posts/PostCard';
import CreatePost from '../components/posts/CreatePost';

const HomePage = () => {
  const { currentUser } = useAuth();
  const { posts, loading, createPost, toggleLike, deletePost } = usePosts(currentUser);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.brandSection}>
            <h1 style={styles.title}>Muro de Mensajes</h1>
            <span style={styles.stats}>{posts.length} Mensajes</span>
          </div>
          
          {!currentUser && (
            <div style={styles.guestCta}>
              <Link to="/login" style={styles.btnSecondary}>Inicia sesión para participar</Link>
            </div>
          )}
        </div>
      </header>

      <main style={styles.container}>
        {currentUser && (
          <section style={styles.creationArea}>
            <CreatePost onSubmit={createPost} />
          </section>
        )}

        <section style={styles.feedArea}>
          <div style={styles.feedHeader}>
            <h2 style={styles.sectionLabel}>Últimas Publicaciones</h2>
          </div>

          {loading ? (
            <div style={styles.statusBox}>Cargando mensajes...</div>
          ) : posts.length === 0 ? (
            <div style={styles.statusBox}>Aún no hay mensajes en este muro.</div>
          ) : (
            <div style={styles.feedGrid}>
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={toggleLike}
                  onDelete={deletePost}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', background: '#ffffff' },
  header: {
    padding: '24px 0',
    borderBottom: '2px solid #000000',
    background: '#ffffff',
    marginBottom: '24px',
  },
  container: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '0 20px',
  },
  brandSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#000',
    letterSpacing: '-0.5px',
  },
  stats: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '500',
  },
  guestCta: {
    marginTop: '16px',
    padding: '12px 16px',
    background: '#f8f8f8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestText: { fontSize: '13px', fontWeight: '600' },
  btnSecondary: {
    fontSize: '12px',
    fontWeight: '700',
    textDecoration: 'underline',
  },
  creationArea: { marginBottom: '32px' },
  feedArea: { paddingTop: '8px' },
  feedHeader: {
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#333',
  },
  statusBox: {
    padding: '60px 0',
    textAlign: 'center',
    fontSize: '14px',
    color: '#999',
    border: '1px dashed #eee',
  },
  feedGrid: { display: 'flex', flexDirection: 'column', gap: '1px', background: '#eee' }, // Líneas divisorias finas
};

export default HomePage;
