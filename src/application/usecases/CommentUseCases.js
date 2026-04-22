// src/application/usecases/CommentUseCases.js
// Casos de uso para comentarios

export class AddCommentUseCase {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute(postId, { contenido, autor }) {
    if (!autor) throw new Error('Debes iniciar sesión para comentar.');
    if (!contenido || contenido.trim().length === 0) {
      throw new Error('El comentario no puede estar vacío.');
    }

    const commentData = {
      contenido: contenido.trim(),
      autorUid: autor.uid,
      autorUsername: autor.username,
      autorNombre: autor.nombre,
      autorApellido: autor.apellido,
      autorPhotoURL: autor.photoURL,
    };

    return await this.postRepository.addComment(postId, commentData);
  }
}

export class SubscribeToCommentsUseCase {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  execute(postId, callback, onError) {
    return this.postRepository.subscribeToComments(postId, callback, onError);
  }
}
