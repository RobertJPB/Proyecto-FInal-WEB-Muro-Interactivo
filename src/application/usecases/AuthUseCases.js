// src/domain/usecases/AuthUseCases.js
// Casos de uso de autenticación (lógica de negocio pura)

export class RegisterUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ username, nombre, apellido, email, password }) {
    if (!username || username.length < 3) {
      throw new Error('El usuario debe tener al menos 3 caracteres.');
    }
    if (!nombre || !apellido) {
      throw new Error('Nombre y apellido son requeridos.');
    }
    if (!email || !email.includes('@')) {
      throw new Error('Email inválido.');
    }
    if (!password || password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres.');
    }

    // Verificar username único
    const existingUser = await this.userRepository.getUserByUsername(username);
    if (existingUser) {
      throw new Error('El nombre de usuario ya está en uso.');
    }

    return await this.userRepository.createUser(
      { username, nombre, apellido, email },
      password
    );
  }
}

export class LoginUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos.');
    }
    return await this.userRepository.login(email, password);
  }
}

export class LogoutUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    return await this.userRepository.logout();
  }
}
export class GoogleLoginUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute() {
    return await this.userRepository.loginWithGoogle();
  }
}
