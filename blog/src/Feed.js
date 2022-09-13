import React from 'react'
import Post from './Post'
import PropTypes from 'prop-types'

const Feed = ({ posts }) => {
  return (
    <>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </>
  )
}

Feed.propTypes = {
  posts: PropTypes.array
}

export default Feed