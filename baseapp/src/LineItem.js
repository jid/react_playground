import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'

const LineItem = ({ el, handleCheck, handleDelete }) => {
  return (
    <li className="item">
      <input
        type="checkbox"
        onChange={() => handleCheck(el.id)}
        checked={el.checked}
      />
      <label
        style={(el.checked) ? { textDecoration: 'line-through' } : null}
        onDoubleClick={() => handleCheck(el.id)}
      >{el.item}</label>
      <FaTrashAlt
        onClick={() => handleDelete(el.id)}
        role="button"
        tabIndex="0"
        aria-label={`Delete ${el.item}`}
      />
    </li>
  )
}

export default LineItem