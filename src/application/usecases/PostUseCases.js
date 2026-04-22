// src/domain/usecases/PostUseCases.js
// Casos de uso de publicaciones

export class CreatePostUseCase {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute({ contenido, autor }) {
    if (!autor) {
      throw new Error('Debes iniciar sesión para publicar.');
    }
    if (!contenido || contenido.trim().length === 0) {
      throw new Error('El contenido no puede estar vacío.');
    }
    if (contenido.length > 500) {
      throw new Error('El contenido no puede exceder 500 caracteres.');
    }

    return await this.postRepository.createPost({
      contenido: contenido.trim(),
      autorUid: autor.uid,
      autorUsername: autor.username,
      autorNombre: autor.nombre,
      autorApellido: autor.apellido,
      autorPhotoURL: autor.photoURL,
      createdAt: new Date(),
      likes: [],
    });
  }
}

export class GetAllPostsUseCase {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute() {
    return await this.postRepository.getAllPosts();
  }
}

export class ToggleLikeUseCase {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute({ postId, uid }) {
    if (!uid) throw new Error('Debes iniciar sesión para dar like.');
    return await this.postRepository.toggleLike(postId, uid);
  }
}

export class DeletePostUseCase {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute({ postId, uid, autorUid }) {
    if (uid !== autorUid) {
      throw new Error('No tienes permiso para eliminar este post.');
    }
    return await this.postRepository.deletePost(postId);
  }
}
