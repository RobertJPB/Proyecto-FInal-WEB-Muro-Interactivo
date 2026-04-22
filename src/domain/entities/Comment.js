// src/domain/entities/Comment.js
// Entidad de dominio: Comentario
export class Comment {
  constructor({ id, contenido, autorUid, autorUsername, autorNombre, autorApellido, autorPhotoURL, createdAt }) {
    this.id = id;
    this.contenido = contenido;
    this.autorUid = autorUid;
    this.autorUsername = autorUsername;
    this.autorNombre = autorNombre;
    this.autorApellido = autorApellido;
    this.autorPhotoURL = autorPhotoURL || null;
    this.createdAt = createdAt || new Date();
  }

  getNombreCompleto() {
    return `${this.autorNombre} ${this.autorApellido}`;
  }

  toPlainObject() {
    return {
      contenido: this.contenido,
      autorUid: this.autorUid,
      autorUsername: this.autorUsername,
      autorNombre: this.autorNombre,
      autorApellido: this.autorApellido,
      autorPhotoURL: this.autorPhotoURL,
      createdAt: this.createdAt,
    };
  }

  static fromFirestore(doc) {
    return new Comment({ id: doc.id, ...doc.data() });
  }
}
