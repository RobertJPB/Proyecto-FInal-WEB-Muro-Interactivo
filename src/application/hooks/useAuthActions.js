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
  if (msg.includes('email-already-in-use')) return 'Este correo electrónico ya se encuentra registrado.';
  if (msg.includes('invalid-email')) return 'El formato del correo electrónico no es válido.';
  if (msg.includes('wrong-password') || msg.includes('invalid-credential')) return 'Credenciales de acceso incorrectas. Verifique su correo y contraseña.';
  if (msg.includes('user-not-found')) return 'No se ha encontrado ninguna cuenta asociada a este correo electrónico.';
  if (msg.includes('too-many-requests')) return 'Acceso bloqueado temporalmente por demasiados intentos fallidos.';
  if (msg.includes('network-request-failed')) return 'Error de conexión. Verifique su acceso a internet.';
  if (msg.includes('weak-password')) return 'La contraseña es demasiado débil. Use al menos 6 caracteres.';
  
  // Si es un error desconocido, devolvemos el mensaje técnico original para facilitar el diagnóstico
  return `Error de sistema: ${msg}`;
};
