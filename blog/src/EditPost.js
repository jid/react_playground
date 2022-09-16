import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy'

const EditPost = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const editPost = useStoreActions((actions) => actions.editPost)
  const getPostById = useStoreState((state) => state.getPostById)
  const post = getPostById(id)

  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  }, [post, setEditTitle, setEditBody])

  const handleEdit = (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = {
      id,
      title: editTitle,
      datetime,
      body: editBody
    }
    editPost(updatedPost)
    navigate(`/post/${id}`)
  }

  return (
    <main className="NewPost">
      {post &&
        <>
          <h2>Edit: {post.title}</h2>
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
            <button type="button" onClick={() => handleEdit(id)}>
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

export default EditPost