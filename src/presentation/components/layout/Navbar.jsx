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
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          muro
        </Link>

        <div style={styles.right}>
          {currentUser ? (
            <>
              <span style={styles.userBadge}>
                {currentUser.username}
              </span>
              <button onClick={handleLogout} style={styles.btnLogout}>
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Entrar</Link>
              <Link to="/register" style={styles.btnBlack}>Registrarse</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: '#ffffff',
    borderBottom: '1px solid #f0f0f0',
  },
  inner: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 32px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontFamily: 'Outfit, sans-serif',
    fontSize: '24px',
    fontWeight: 700,
    color: '#000000',
    textDecoration: 'none',
    letterSpacing: '-1px',
    textTransform: 'lowercase',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  userBadge: {
    fontSize: '13px',
    color: '#000000',
    fontWeight: 600,
    textTransform: 'lowercase',
    opacity: 0.8,
  },
  btnLogout: {
    fontSize: '13px',
    color: '#888888',
    padding: '4px 0',
    borderBottom: '1px solid transparent',
    transition: 'all 0.2s',
  },
  link: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#000000',
  },
  btnBlack: {
    padding: '10px 24px',
    background: '#000000',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
};

export default Navbar;
