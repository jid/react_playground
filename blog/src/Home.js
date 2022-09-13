import React from 'react'
import Feed from './Feed'
import PropTypes from 'prop-types'

const Home = ({ posts }) => {
  return (
    <main className="Home">
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p className="Home__empty">No posts to display</p>
      )}
    </main>
  )
}

Home.propTypes = {
  posts: PropTypes.array
}

export default Home