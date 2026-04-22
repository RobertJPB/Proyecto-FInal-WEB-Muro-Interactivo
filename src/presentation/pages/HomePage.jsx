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
    <main style={styles.main}>
      <header style={styles.hero}>
        <div style={styles.container}>
          <h1 style={styles.title}>
            muro<span style={styles.accent}>.</span> interactivo
          </h1>
          <p style={styles.subtitle}>
            un espacio para compartir sin ruido. {posts.length} mensajes publicados.
          </p>
        </div>
      </header>

      <div style={styles.container}>
        {currentUser ? (
          <CreatePost onSubmit={createPost} />
        ) : (
          <div style={styles.cta}>
            <p style={styles.ctaText}>conéctate para participar.</p>
            <div style={styles.ctaActions}>
              <Link to="/login" style={styles.link}>entrar</Link>
              <Link to="/register" style={styles.btn}>crear cuenta</Link>
            </div>
          </div>
        )}

        {loading ? (
          <div style={styles.loading}>
            <p>cargando muro...</p>
          </div>
        ) : posts.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyText}>el muro está en silencio.</p>
          </div>
        ) : (
          <div style={styles.feed}>
            {posts.map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                index={i}
                onLike={toggleLike}
                onDelete={deletePost}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

const styles = {
  main: { minHeight: '100vh', background: '#ffffff' },
  hero: {
    padding: '100px 0 60px',
    borderBottom: '1px solid #f0f0f0',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 32px',
  },
  title: {
    fontFamily: 'Outfit, sans-serif',
    fontSize: '56px',
    fontWeight: 500,
    color: '#000000',
    letterSpacing: '0.05em',
    marginBottom: '20px',
    textTransform: 'lowercase',
    lineHeight: 1.1,
  },
  accent: { color: '#888' },
  subtitle: {
    fontSize: '14px',
    color: '#888888',
    textTransform: 'lowercase',
    letterSpacing: '0.05em',
  },
  cta: {
    padding: '60px 0',
    textAlign: 'center',
    borderBottom: '1px solid #f0f0f0',
    marginBottom: '40px',
  },
  ctaText: {
    fontSize: '18px',
    marginBottom: '24px',
    textTransform: 'lowercase',
  },
  ctaActions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '32px',
  },
  link: {
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'lowercase',
    borderBottom: '1px solid #000',
  },
  btn: {
    padding: '12px 32px',
    background: '#000',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  loading: {
    padding: '100px 0',
    textAlign: 'center',
    color: '#888',
    fontSize: '13px',
    textTransform: 'lowercase',
    letterSpacing: '0.1em',
  },
  empty: {
    padding: '100px 0',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: '14px',
    color: '#ccc',
    textTransform: 'lowercase',
    letterSpacing: '0.1em',
  },
  feed: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default HomePage;
