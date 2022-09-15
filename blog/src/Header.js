import React from 'react'
import PropTypes from 'prop-types'
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa'
import { useContext, useState, useEffect } from 'react'
import DataContext from './context/DataContext'
import useWindowSize from './hooks/useWindowSize'

const Header = ({ title }) => {
  const { width } = useWindowSize()
  const [postsCount, setPostsCount] = useState(0)
  const { posts } = useContext(DataContext)

  useEffect(() => {
    setPostsCount(posts.length)
  }, [posts])

  return (
    <header className="Header">
      <h1>{title}</h1>
      <span className="postsCount">{postsCount} posts</span>
      {width < 768 ? <FaMobileAlt />
        : width < 992 ? <FaTabletAlt />
          : <FaLaptop />}
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header