// src/domain/repositories/IUserRepository.js
// Interfaz / contrato del repositorio de usuarios
export class IUserRepository {
  async createUser(user, password) { throw new Error('Not implemented'); }
  async getUserById(uid) { throw new Error('Not implemented'); }
  async getUserByUsername(username) { throw new Error('Not implemented'); }
  async login(email, password) { throw new Error('Not implemented'); }
  async loginWithGoogle() { throw new Error('Not implemented'); }
  async logout() { throw new Error('Not implemented'); }
  async updateProfile(uid, data) { throw new Error('Not implemented'); }
  onAuthStateChanged(callback) { throw new Error('Not implemented'); }
}
