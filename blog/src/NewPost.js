import React from 'react'
import { useState } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy'

const NewPost = () => {
  const posts = useStoreState((state) => state.posts)
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const addPost = useStoreActions((actions) => actions.addPost)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const post = {
      id,
      title: postTitle,
      datetime,
      body: postBody
    }
    addPost(post)
    navigate(`/`)
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

export default NewPost