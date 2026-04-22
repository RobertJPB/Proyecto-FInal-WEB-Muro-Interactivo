// src/domain/entities/User.js
// Entidad de dominio: Usuario
export class User {
  constructor({ uid, username, nombre, apellido, email, createdAt }) {
    this.uid = uid;
    this.username = username;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.createdAt = createdAt || new Date();
  }

  getNombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }

  toPlainObject() {
    return {
      uid: this.uid,
      username: this.username,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      createdAt: this.createdAt,
    };
  }

  static fromFirestore(data, uid) {
    return new User({ uid, ...data });
  }
}
