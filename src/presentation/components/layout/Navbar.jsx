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
      <div style={styles.container}>
        <Link to="/" style={styles.logoContainer}>
          <span style={styles.logoPrimary}>
            Robert<span style={{ color: '#0055ff' }}>Book</span>
          </span>
          <span style={styles.logoSecondary}>muro interactivo</span>
        </Link>

        <div style={styles.actions}>
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
              <Link to="/login" style={styles.link}>Iniciar sesión</Link>
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
    height: '80px',
    background: '#ffffff',
    borderBottom: '1px solid #e2e2e2',
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
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '1.1',
  },
  logoPrimary: {
    fontFamily: 'Outfit, sans-serif',
    fontSize: '28px',
    fontWeight: 700,
    color: '#000000',
    letterSpacing: '-1px',
  },
  logoSecondary: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '11px',
    fontWeight: 500,
    color: '#666666',
    textTransform: 'lowercase',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
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
    border: '2px solid #f0f0f0',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  miniPlaceholder: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#0055ff',
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
    color: '#000',
  },
  link: {
    fontSize: '14px',
    color: '#000',
  },
  btnRegister: {
    background: '#000',
    color: '#fff',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: 500,
  },
};

export default Navbar;
