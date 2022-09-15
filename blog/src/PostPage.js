import React from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
// import PropTypes from 'prop-types'
import { useContext } from 'react'
import DataContext from './context/DataContext'
import api from './api/posts'

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext)
  const { id } = useParams()
  const post = posts.find(post => post.id.toString() === id)
  const navigate = useNavigate()

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const newPosts = posts.filter(post => post.id.toString() !== id.toString())
      setPosts(newPosts)
      navigate('/')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <main className="PostPage">
      <article className="post">
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postData">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button className="deleteButton" onClick={() => handleDelete(id)}>
              Delete Post
            </button>
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
      </article>
    </main>
  )
}

// PostPage.propTypes = {
//   posts: PropTypes.array,
//   handleDelete: PropTypes.func
// }

export default PostPage