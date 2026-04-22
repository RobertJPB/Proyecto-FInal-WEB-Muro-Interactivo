// src/application/hooks/useAuthActions.js
import { useState } from 'react';
import {
  registerUserUseCase,
  loginUserUseCase,
  logoutUserUseCase,
} from '../services/ServiceContainer';
import toast from 'react-hot-toast';

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);

  const register = async (formData) => {
    setLoading(true);
    try {
      await registerUserUseCase.execute(formData);
      toast.success('¡Cuenta creada exitosamente!');
      return true;
    } catch (err) {
      // Traducir errores de Firebase
      const msg = translateFirebaseError(err.message);
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      await loginUserUseCase.execute({ email, password });
      toast.success('¡Bienvenido de vuelta!');
      return true;
    } catch (err) {
      const msg = translateFirebaseError(err.message);
      toast.error(msg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutUserUseCase.execute();
    toast.success('Sesión cerrada.');
  };

  return { register, login, logout, loading };
};

const translateFirebaseError = (msg) => {
  if (msg.includes('email-already-in-use')) return 'Este email ya está registrado.';
  if (msg.includes('wrong-password') || msg.includes('invalid-credential')) return 'Email o contraseña incorrectos.';
  if (msg.includes('user-not-found')) return 'No existe una cuenta con ese email.';
  if (msg.includes('too-many-requests')) return 'Demasiados intentos. Intenta más tarde.';
  if (msg.includes('network-request-failed')) return 'Error de red. Verifica tu conexión.';
  return msg;
};
