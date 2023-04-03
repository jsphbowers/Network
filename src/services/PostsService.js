import { AppState } from "../AppState.js";
import { Profile } from "../models/Account.js";
import { Post } from "../models/Post.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class PostsService {
  async getPosts() {
    const res = await api.get('api/posts')
    logger.log('[GETTING POSTS]', res.data)
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.posts = res.data.posts.map(p => new Post(p))
    logger.log('[SETTING POSTS TO APPSTATE]', AppState.posts)
  }

  async changePage(url) {
    const res = await api.get(url)
    logger.log('[CHANGING PAGE]', res.data)
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async createPost(postData) {
    const res = await api.post('api/posts', postData)
    logger.log('made a post', res.data)
    const newPost = new Post(res.data)
    AppState.posts.push(newPost)
  }

  async deletePost(postId) {
    const res = await api.delete(`api/posts/${postId}`)
    logger.log('[DELETING POST]', res.data)
  }

  async getPostsById(query) {
    const res = await api.get(`api/posts`, { params: query })
    logger.log(res.data)
    AppState.newer = res.data.newer
    AppState.older = res.data.older
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async searchProfiles(query) {
    const res = await api.get(`api/profiles?`, { params: query })
    logger.log('[THIS SHOULD HAVE THE PROFILES]', res.data)
    AppState.profiles = res.data.map(p => new Profile(p))
  }

  async searchPosts(query) {
    const res = await api.get(`api/posts?`, { params: query })
    logger.log(res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.newer = res.data.newer
    AppState.older = res.data.older
  }

  async like(postId) {
    const res = await api.post(`api/posts/${postId}/like`)
  }
}

export const postsService = new PostsService();