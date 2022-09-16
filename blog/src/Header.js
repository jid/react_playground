import React from 'react'
import PropTypes from 'prop-types'
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa'
import useWindowSize from './hooks/useWindowSize'
import { useStoreState } from 'easy-peasy'

const Header = ({ title }) => {
  const { width } = useWindowSize()
  const postsCount = useStoreState((state) => state.postsCount)

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