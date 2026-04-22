// src/domain/repositories/IPostRepository.js
// Interfaz / contrato del repositorio de posts
export class IPostRepository {
  async getAllPosts() { throw new Error('Not implemented'); }
  async createPost(post) { throw new Error('Not implemented'); }
  async deletePost(postId) { throw new Error('Not implemented'); }
  async toggleLike(postId, uid) { throw new Error('Not implemented'); }
  subscribeToAllPosts(callback, onError) { throw new Error('Not implemented'); }
  
  // Comments
  async addComment(postId, commentData) { throw new Error('Not implemented'); }
  async deleteComment(postId, commentId) { throw new Error('Not implemented'); }
  async toggleCommentLike(postId, commentId, uid) { throw new Error('Not implemented'); }
  subscribeToComments(postId, callback, onError) { throw new Error('Not implemented'); }
}
