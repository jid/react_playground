import React from 'react'
import LineItem from './LineItem'

const ItemList = ({ items, handleCheck, handleDelete }) => {
  return (
    <ul>
      {items.map(el => (
        <LineItem
          key={el.id}
          el={el}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  )
}

export default ItemList