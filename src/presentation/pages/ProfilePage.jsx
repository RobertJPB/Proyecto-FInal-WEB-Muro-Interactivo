import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAuthActions } from '../../application/hooks/useAuthActions';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const { updateProfile, logout, loading } = useAuthActions();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setForm({
        nombre: currentUser.nombre || '',
        apellido: currentUser.apellido || '',
      });
      setPreview(currentUser.photoURL);
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateProfile(currentUser.uid, {
      ...form,
      photoFile,
    });
    if (success) {
      navigate('/');
    }
  };

  if (!currentUser) return null;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Mi Perfil</h1>
        <p style={styles.sub}>Gestiona tu identidad en RobertBook</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.photoSection}>
            <div style={styles.avatarWrap}>
              {preview ? (
                <img src={preview} alt="Profile" style={styles.avatarImg} />
              ) : (
                <div style={styles.avatarPlaceholder}>
                  {currentUser.nombre ? currentUser.nombre.charAt(0).toUpperCase() : '?'}
                </div>
              )}
            </div>
            <label style={styles.fileLabel}>
              Cambiar foto de perfil
              <input 
                type="file" 
                onChange={handleFileChange} 
                accept="image/*" 
                style={styles.fileInput} 
              />
            </label>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Apellido</label>
            <input
              type="text"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Nombre de usuario (permanente)</label>
            <input
              type="text"
              value={`@${currentUser.username}`}
              style={{ ...styles.input, background: '#f5f5f5', color: '#999', cursor: 'not-allowed' }}
              disabled
            />
          </div>

          <div style={styles.actions}>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={styles.cancelBtn}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={styles.saveBtn}
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>

        <div style={styles.divider}></div>

        <div style={styles.logoutSection}>
          <button
            type="button"
            onClick={handleLogout}
            style={styles.logoutBtn}
            disabled={loading}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 20px',
    background: '#ffffff',
  },
  container: {
    width: '100%',
    maxWidth: '440px',
  },
  title: {
    fontFamily: 'Outfit, sans-serif',
    fontSize: '32px',
    fontWeight: 700,
    marginBottom: '8px',
    color: '#000',
  },
  sub: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '40px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  photoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  avatarWrap: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: '#0055ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '4px solid #f9f9f9',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarPlaceholder: {
    fontSize: '48px',
    fontWeight: 700,
    color: '#fff',
  },
  fileLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#0055ff',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  fileInput: {
    display: 'none',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#999',
    letterSpacing: '1px',
  },
  input: {
    padding: '12px 0',
    border: 'none',
    borderBottom: '2px solid #e2e2e2',
    fontSize: '16px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  actions: {
    display: 'flex',
    gap: '16px',
    marginTop: '24px',
  },
  saveBtn: {
    flex: 2,
    background: '#000',
    color: '#fff',
    padding: '14px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  cancelBtn: {
    flex: 1,
    background: 'none',
    border: '1px solid #e2e2e2',
    padding: '14px',
    borderRadius: '8px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  divider: {
    height: '1px',
    backgroundColor: '#eee',
    margin: '40px 0',
  },
  logoutSection: {
    display: 'flex',
    justifyContent: 'center',
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: '#d32f2f',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    padding: '10px 20px',
    transition: 'opacity 0.2s',
  },
};

export default ProfilePage;
