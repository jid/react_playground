import React from 'react'

const Footer = ({ itemsCount }) => {
  return (
    <footer>
      <p>{itemsCount} List {itemsCount === 1 ? 'item' : 'items'}</p>
    </footer>
  )
}

export default Footer