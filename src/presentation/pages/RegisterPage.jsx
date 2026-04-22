// src/presentation/pages/RegisterPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAuthActions } from '../../application/hooks/useAuthActions';

const RegisterPage = () => {
  const { currentUser } = useAuth();
  const { register, loading } = useAuthActions();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container} className="animate-fadeUp">
        <h1 style={styles.title}>Registro</h1>
        <p style={styles.sub}>
          ¿Ya tiene una cuenta? <Link to="/login" style={styles.link}>Entre aquí</Link>
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Ej: jperez88"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Nombre</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Juan"
                required
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Apellido</label>
              <input
                type="text"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                placeholder="Pérez"
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="juan.perez@ejemplo.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.passWrap}>
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                required
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                style={styles.toggleBtn}
                tabIndex={-1}
              >
                {showPass ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.submitBtn, opacity: loading ? 0.3 : 1 }}
          >
            {loading ? 'Preparando registro...' : 'Registrar mi cuenta'}
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
    padding: '60px 0',
  },
  container: {
    width: '100%',
    maxWidth: '440px',
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
    color: '#666666',
    marginBottom: '40px',
  },
  link: {
    color: '#000000',
    fontWeight: 600,
    textDecoration: 'underline',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '32px' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  field: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { 
    fontSize: '10px', 
    fontWeight: 700, 
    color: '#000', 
    letterSpacing: '0.15em', 
    textTransform: 'uppercase' 
  },
  passWrap: { position: 'relative' },
  toggleBtn: {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#888',
    display: 'flex',
    alignItems: 'center',
    padding: '0',
  },
  input: {
    padding: '12px 0',
    background: 'transparent',
    borderBottom: '1px solid #e0e0e0',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    color: '#000000',
    fontSize: '15px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%',
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

export default RegisterPage;
