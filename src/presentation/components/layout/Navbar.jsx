// src/presentation/components/layout/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAuthActions } from '../../../application/hooks/useAuthActions';

const Navbar = () => {
  const { currentUser } = useAuth();
  const { logout } = useAuthActions();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

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
              <span style={styles.user}>
                {currentUser.username}
              </span>
              <button onClick={handleLogout} style={styles.btnLogout}>
                Cerrar sesión
              </button>
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
    height: '64px',
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
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 24px',
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
    fontSize: '22px',
    fontWeight: 700,
    color: '#000000',
    letterSpacing: '-0.5px',
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
  user: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#666',
  },
  btnLogout: {
    fontSize: '14px',
    color: '#000',
    textDecoration: 'underline',
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
