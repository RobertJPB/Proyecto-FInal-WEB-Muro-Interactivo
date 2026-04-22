// src/domain/entities/Comment.js
// Entidad de dominio: Comentario
export class Comment {
  constructor({ id, contenido, autorUid, autorUsername, autorNombre, autorApellido, autorPhotoURL, createdAt, likes }) {
    this.id = id;
    this.contenido = contenido;
    this.autorUid = autorUid;
    this.autorUsername = autorUsername;
    this.autorNombre = autorNombre;
    this.autorApellido = autorApellido;
    this.autorPhotoURL = autorPhotoURL || null;
    this.createdAt = createdAt || new Date();
    this.likes = likes || [];
  }

  getNombreCompleto() {
    return `${this.autorNombre} ${this.autorApellido}`;
  }

  getLikesCount() {
    return this.likes.length;
  }

  isLikedBy(uid) {
    return this.likes.includes(uid);
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
      likes: this.likes,
    };
  }

  static fromFirestore(doc) {
    return new Comment({ id: doc.id, ...doc.data() });
  }
}
