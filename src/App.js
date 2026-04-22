// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './presentation/context/AuthContext';
import Navbar from './presentation/components/layout/Navbar';
import HomePage from './presentation/pages/HomePage';
import LoginPage from './presentation/pages/LoginPage';
import RegisterPage from './presentation/pages/RegisterPage';
import ProfilePage from './presentation/pages/ProfilePage';

// Ruta protegida: redirige al login si no hay sesión
const ProtectedRoute = ({ children }) => {
  const { currentUser, authLoading } = useAuth();
  if (authLoading) return <LoadingScreen />;
  return currentUser ? children : <Navigate to="/login" replace />;
};

// Ruta pública: redirige al home si ya hay sesión
const PublicRoute = ({ children }) => {
  const { currentUser, authLoading } = useAuth();
  if (authLoading) return <LoadingScreen />;
  return !currentUser ? children : <Navigate to="/" replace />;
};

const LoadingScreen = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '16px',
    background: 'var(--bg)',
  }}>
    <div style={{
      fontFamily: 'Outfit, sans-serif',
      fontSize: '32px',
      fontWeight: 700,
      color: 'var(--text)',
      marginBottom: '12px',
    }}>
      Muro Interactivo
    </div>
    <div style={{
      fontSize: '14px',
      color: 'var(--text-muted)',
      marginBottom: '40px',
    }}>
      Cargando...
    </div>
    <span className="spinner" />
  </div>
);

const AppContent = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      {/* Pública: cualquiera puede ver el muro */}
      <Route path="/" element={<HomePage />} />

      {/* Solo para no autenticados */}
      <Route path="/login" element={
        <PublicRoute><LoginPage /></PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute><RegisterPage /></PublicRoute>
      } />
      <Route path="/perfil" element={
        <ProtectedRoute><ProfilePage /></ProtectedRoute>
      } />

      {/* Cualquier otra ruta → Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

    {/* Notificaciones toast */}
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#f8f8f8',
          color: '#1a1a1a',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '12px',
          fontSize: '14px',
          fontFamily: 'DM Sans, sans-serif',
        },
        success: {
          iconTheme: { primary: '#1a1a1a', secondary: '#ffffff' },
        },
        error: {
          iconTheme: { primary: '#dc3545', secondary: '#ffffff' },
        },
      }}
    />
  </BrowserRouter>
);

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
