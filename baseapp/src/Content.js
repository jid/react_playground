import React from 'react'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

const Content = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: true,
      item: "Old cheese"
    },
    {
      id: 2,
      checked: false,
      item: "Bread"
    },
    {
      id: 3,
      checked: false,
      item: "Butter"
    }
  ])

  const handleCheck = (id) => {
    const listItems = items.map((el) => el.id === id ? { ...el, checked: !el.checked } : el)
    setItems(listItems)
    localStorage.setItem('shoppingList', JSON.stringify(listItems))
  }

  const handleDelete = (id) => {
    const listItems = items.filter((el) => el.id !== id)
    setItems(listItems)
    localStorage.setItem('shoppingList', JSON.stringify(listItems))
  }

  return (
    <main>
      {items.length ? (
        <ul>
          {items.map(el => (
            <li className="item" key={el.id}>
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
              />
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: '2rem' }}>Your list is empty</p>
      )}
    </main>
  )
}

export default Content