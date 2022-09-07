import React from 'react'
import SearchItem from './SearchItem'
import Header from './Header'
import AddItem from './AddItem'
import Content from './Content'
import Footer from './Footer'
import { useState, useEffect } from 'react'
import apiRequest from './apiRequest'

function App() {
  const API_URL = 'http://localhost:3500/items'

  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error('Invalid data received')
        const listItems = await response.json()
        setItems(listItems)
        setFetchError(null)
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    // simulate slow REST API
    setTimeout(() => {
      (async () => await fetchItems())()
    }, 2000)
  }, [])

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = { id, checked: false, item }
    const listItems = [...items, myNewItem]
    setItems(listItems)

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, postOptions)
    if (result) setFetchError(result)
  }

  const handleCheck = async (id) => {
    const listItems = items.map((el) => el.id === id ? { ...el, checked: !el.checked } : el)
    setItems(listItems)
    const myItem = listItems.filter(el => el.id === id)

    const patchOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    }

    const result = await apiRequest([API_URL, id].join('/'), patchOptions)
    if (result) setFetchError(result)
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((el) => el.id !== id)
    setItems(listItems)

    const deleteOptions = {
      method: 'DELETE'
    }

    const result = await apiRequest([API_URL, id].join('/'), deleteOptions)
    if (result) setFetchError(result)
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
      <main>
        {isLoading && <p className="loading">Loading items...</p>}
        {fetchError && <p className="error">{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />}
      </main>
      <Footer
        itemsCount={items.length}
      />
    </div>
  );
}

export default App;
