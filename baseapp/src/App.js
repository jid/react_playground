import React from 'react';
import SearchItem from './SearchItem';
import Header from './Header'
import AddItem from './AddItem';
import Content from './Content'
import Footer from './Footer'
import { useState } from 'react'

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')))
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  const setAndSaveItems = (items) => {
    setItems(items)
    localStorage.setItem('shoppingList', JSON.stringify(items))
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = { id, checked: false, item }
    const listItems = [...items, myNewItem]
    setAndSaveItems(listItems)
  }

  const handleCheck = (id) => {
    const listItems = items.map((el) => el.id === id ? { ...el, checked: !el.checked } : el)
    setAndSaveItems(listItems)
  }

  const handleDelete = (id) => {
    const listItems = items.filter((el) => el.id !== id)
    setAndSaveItems(listItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem || !newItem.trim()) {
      setNewItem('')
      return
    }
    addItem(newItem)
    setNewItem('')
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
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
