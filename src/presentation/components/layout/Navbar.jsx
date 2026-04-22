// src/presentation/components/layout/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAuthActions } from '../../../application/hooks/useAuthActions';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      <div style={styles.container} className="nav-container">
        <Link to="/" style={styles.logoContainer}>
          <span style={styles.logoPrimary} className="logo-primary">
            Robert<span style={{ color: '#0055ff' }}>Book</span>
          </span>
          <span style={styles.logoSecondary} className="logo-secondary">muro interactivo</span>
        </Link>

        <div style={styles.actions} className="nav-actions">
          {currentUser ? (
            <>
              <Link to="/perfil" style={styles.userContainer}>
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Mini-profile" style={styles.miniAvatar} />
                ) : (
                  <div style={styles.miniPlaceholder}>
                    {currentUser.nombre ? currentUser.nombre.charAt(0).toUpperCase() : '?'}
                  </div>
                )}
                <span style={styles.user}>
                  Mi Perfil
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link} className="nav-link">Iniciar sesión</Link>
              <Link to="/register" style={styles.btnRegister}>Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    height: '64px',
    background: 'var(--bg)',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '1.1',
    flexShrink: 0,
  },
  logoPrimary: {
    fontFamily: 'Outfit, sans-serif',
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--text)',
  },
  logoSecondary: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '11px',
    fontWeight: 500,
    color: 'var(--text-muted)',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexShrink: 0,
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
  },
  miniAvatar: {
    width: '40px',
    height: '40px',
    border: '2px solid var(--border)',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  miniPlaceholder: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'var(--accent)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 700,
  },
  user: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text)',
  },
  link: {
    fontSize: '14px',
    color: 'var(--accent)',
    fontWeight: '600',
  },
  btnRegister: {
    background: 'var(--accent)',
    color: '#fff',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: 'var(--radius)',
  },
};

export default Navbar;
