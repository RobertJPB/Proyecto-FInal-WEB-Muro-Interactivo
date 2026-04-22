// src/application/services/ServiceContainer.js
// Contenedor de Inyección de Dependencias - conecta capas

import { FirebaseUserRepository } from '../../infrastructure/repositories/FirebaseUserRepository';
import { FirebasePostRepository } from '../../infrastructure/repositories/FirebasePostRepository';
import {
  RegisterUserUseCase,
  LoginUserUseCase,
  LogoutUserUseCase,
  GoogleLoginUseCase,
  UpdateProfileUseCase,
} from '../usecases/AuthUseCases';
import {
  CreatePostUseCase,
  GetAllPostsUseCase,
  ToggleLikeUseCase,
  DeletePostUseCase,
} from '../usecases/PostUseCases';

// Repositorios (infraestructura)
const userRepository = new FirebaseUserRepository();
const postRepository = new FirebasePostRepository();

// Casos de uso (dominio)
export const registerUserUseCase = new RegisterUserUseCase(userRepository);
export const loginUserUseCase = new LoginUserUseCase(userRepository);
export const googleLoginUseCase = new GoogleLoginUseCase(userRepository);
export const updateProfileUseCase = new UpdateProfileUseCase(userRepository);
export const logoutUserUseCase = new LogoutUserUseCase(userRepository);

export const createPostUseCase = new CreatePostUseCase(postRepository);
export const getAllPostsUseCase = new GetAllPostsUseCase(postRepository);
export const toggleLikeUseCase = new ToggleLikeUseCase(postRepository);
export const deletePostUseCase = new DeletePostUseCase(postRepository);

// Exportar repositorios para suscripciones en tiempo real
export { userRepository, postRepository };
