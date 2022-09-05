import React from 'react';
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import { useState } from 'react'

function App() {
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
    <div className="App">
      <Header title="Grocery List" />
      <Content
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer
        itemsCount={items.length}
      />
    </div>
  );
}

export default App;
