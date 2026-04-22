// src/presentation/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAuthActions } from '../../application/hooks/useAuthActions';

const LoginPage = () => {
  const { currentUser } = useAuth();
  const { login, loading } = useAuthActions();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container} className="animate-fadeUp">
        <h1 style={styles.title}>entrar.</h1>
        <p style={styles.sub}>
          ¿nuevo aquí? <Link to="/register" style={styles.link}>crear una cuenta.</Link>
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>contraseña</label>
            <div style={styles.passWrap}>
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                style={styles.toggleBtn}
                tabIndex={-1}
              >
                {showPass ? 'ocultar' : 'ver'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.submitBtn, opacity: loading ? 0.3 : 1 }}
          >
            {loading ? 'entrando...' : 'acceder al muro'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ffffff',
  },
  container: {
    width: '100%',
    maxWidth: '400px',
    padding: '0 32px',
  },
  title: {
    fontFamily: 'Outfit, sans-serif',
    fontSize: '48px',
    fontWeight: 600,
    color: '#000000',
    letterSpacing: '0.05em',
    marginBottom: '12px',
  },
  sub: {
    fontSize: '14px',
    color: '#888888',
    marginBottom: '48px',
    textTransform: 'lowercase',
  },
  link: {
    color: '#000000',
    fontWeight: 600,
    textDecoration: 'underline',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '32px' },
  field: { display: 'flex', flexDirection: 'column', gap: '12px' },
  label: { 
    fontSize: '11px', 
    fontWeight: 700, 
    color: '#000', 
    letterSpacing: '0.15em', 
    textTransform: 'uppercase' 
  },
  input: {
    padding: '16px 0',
    background: 'transparent',
    borderBottom: '1px solid #e0e0e0',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    color: '#000000',
    fontSize: '16px',
    fontFamily: 'DM Sans, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%',
  },
  passWrap: { position: 'relative' },
  toggleBtn: {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#888',
  },
  submitBtn: {
    width: '100%',
    padding: '16px',
    background: '#000000',
    color: '#ffffff',
    fontFamily: 'Outfit, sans-serif',
    fontWeight: 600,
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginTop: '16px',
  },
};

export default LoginPage;
