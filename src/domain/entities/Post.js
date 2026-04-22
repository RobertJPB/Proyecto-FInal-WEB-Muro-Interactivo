// src/domain/entities/Post.js
// Entidad de dominio: Post/Publicación
export class Post {
  constructor({ id, contenido, autorUid, autorUsername, autorNombre, autorApellido, autorPhotoURL, createdAt, likes = [] }) {
    this.id = id;
    this.contenido = contenido;
    this.autorUid = autorUid;
    this.autorUsername = autorUsername;
    this.autorNombre = autorNombre;
    this.autorApellido = autorApellido;
    this.autorPhotoURL = autorPhotoURL || null;
    this.createdAt = createdAt || new Date();
    this.likes = likes;
  }

  getNombreCompleto() {
    return `${this.autorNombre} ${this.autorApellido}`;
  }

  isLikedBy(uid) {
    return this.likes.includes(uid);
  }

  getLikesCount() {
    return this.likes.length;
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
    return new Post({ id: doc.id, ...doc.data() });
  }
}
