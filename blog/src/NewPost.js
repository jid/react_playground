import React from 'react'
// import PropTypes from 'prop-types'
import { useState, useContext } from 'react'
import DataContext from './context/DataContext'
import { format } from 'date-fns'
import api from './api/posts'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {
  const { posts, setPosts } = useContext(DataContext)
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const post = {
      id,
      title: postTitle,
      datetime,
      body: postBody
    }

    try {
      const response = await api.post('/posts', post)
      const newPosts = [...posts, response.data]
      setPosts(newPosts)
      setPostTitle('')
      setPostBody('')
      navigate(`/`)
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm"
        onSubmit={handleSubmit}
      >
        <label htmlFor="postTitle" >Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody" >Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </main>
  )
}

// NewPost.propTypes = {
//   postTitle: PropTypes.string,
//   setPostTitle: PropTypes.func,
//   postBody: PropTypes.string,
//   setPostBody: PropTypes.func,
//   handleSubmit: PropTypes.func
// }

export default NewPost