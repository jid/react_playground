import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
// import PropTypes from 'prop-types'
import DataContext from './context/DataContext'
import { format } from 'date-fns'
import api from './api/posts'
import { useNavigate } from 'react-router-dom'

const EditPost = () => {
  const { posts, setPosts } = useContext(DataContext)
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()
  const post = posts.find(post => post.id.toString() === id)

  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  }, [post, setEditTitle, setEditBody])

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = {
      title: editTitle,
      datetime,
      body: editBody
    }

    try {
      await api.patch(`/posts/${id}`, updatedPost)
      setPosts(posts.map(post => post.id === id ? { ...post, ...updatedPost } : post))
      setEditTitle('')
      setEditBody('')
      navigate('/')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <main className="NewPost">
      {post &&
        <>
          <h2>Edit: {editTitle}</h2>
          <form className="newPostForm" onSubmit={e => e.preventDefault()}>
            <label htmlFor="editTitle" >Title:</label>
            <input
              id="editTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="editBody" >Post:</label>
            <textarea
              id="editBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>
              Submit
            </button>
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </form>
        </>
      }
      {!post &&
        <>
          <h2>Post Not Found</h2>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      }
    </main>
  )
}

// EditPost.propTypes = {
//   editTitle: PropTypes.string,
//   setEditTitle: PropTypes.func,
//   editBody: PropTypes.string,
//   setEditBody: PropTypes.func,
//   handleEdit: PropTypes.func
// }

export default EditPost