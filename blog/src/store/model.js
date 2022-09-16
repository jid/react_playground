import { action, thunk, computed } from 'easy-peasy'
import api from '../api/posts'

const model = {
  posts: [],
  setPosts: action((state, payload) => {
    state.posts = payload
  }),
  searchResults: [],
  setSearchResults: action((state, payload) => {
    state.searchResults = payload
  }),
  postsCount: computed((state) => state.posts.length),
  getPostById: computed((state) => {
    return (id) => state.posts.find(el => el.id.toString() === id)
  }),
  addPost: thunk(async (actions, newPost, helpers) => {
    const { posts } = helpers.getState()
    try {
      const response = await api.post('/posts', newPost)
      actions.setPosts([...posts, response.data])
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }),
  deletePost: thunk(async (actions, id, helpers) => {
    const { posts } = helpers.getState()
    try {
      await api.delete(`/posts/${id}`)
      const newPosts = posts.filter(post => post.id.toString() !== id.toString())
      actions.setPosts(newPosts)
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }),
  editPost: thunk(async (actions, updatedPost, helpers) => {
    const { posts } = helpers.getState()
    const { id } = updatedPost
    try {
      await api.patch(`/posts/${id}`, updatedPost)
      actions.setPosts(posts.map(post => post.id === id ? { ...post, ...updatedPost } : post))
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  })
}

export default model