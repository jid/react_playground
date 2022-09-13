import React from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

const EditPost = ({
  posts,
  editTitle,
  setEditTitle,
  editBody,
  setEditBody,
  handleEdit
}) => {
  const { id } = useParams()
  const post = posts.find(post => post.id.toString() === id)

  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  }, [post, setEditTitle, setEditBody])

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

EditPost.propTypes = {
  editTitle: PropTypes.string,
  setEditTitle: PropTypes.func,
  editBody: PropTypes.string,
  setEditBody: PropTypes.func,
  handleEdit: PropTypes.func
}

export default EditPost