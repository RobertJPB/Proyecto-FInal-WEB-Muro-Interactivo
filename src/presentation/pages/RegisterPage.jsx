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
        <h1 style={styles.title}>registro.</h1>
        <p style={styles.sub}>
          ¿ya tienes cuenta? <Link to="/login" style={styles.link}>entra aquí.</Link>
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="como te llamarán"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>nombre</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="juan"
                required
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>apellido</label>
              <input
                type="text"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                placeholder="perez"
                required
                style={styles.input}
              />
            </div>
          </div>

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
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="mínimo 6 caracteres"
              required
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.submitBtn, opacity: loading ? 0.3 : 1 }}
          >
            {loading ? 'creando...' : 'crear mi cuenta'}
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
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  field: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { 
    fontSize: '10px', 
    fontWeight: 700, 
    color: '#000', 
    letterSpacing: '0.15em', 
    textTransform: 'uppercase' 
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
    fontFamily: 'DM Sans, sans-serif',
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
