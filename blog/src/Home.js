import React from 'react'
import Feed from './Feed'
import PropTypes from 'prop-types'

const Home = ({ posts, fetchError, isLoading }) => {
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}
      {!isLoading && fetchError && <p className="statusMsg" style={{ color: 'red' }}>{fetchError}</p>}
      {!isLoading && !fetchError && (posts.length ?
        <Feed posts={posts} />
        :
        <p className="statusMsg">No posts to display</p>
      )}
    </main>
  )
}

Home.propTypes = {
  posts: PropTypes.array
}

export default Home