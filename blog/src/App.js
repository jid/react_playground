import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import EditPost from './EditPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import api from './api/posts'
import useWindowSize from './hooks/useWindowSize'

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState(posts)
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate()
  const { width } = useWindowSize()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
      } catch (err) {
        // HTTP response code <> 2xx range
        if (err.response) {
          console.log(`data: ${err.response.data}; staus: ${err.response.status}; headers: ${err.response.headers}`)
        }
        else {
          console.log(`Error: ${err.message}`)
        }

        console.log(err.toJSON())
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    let postsFiltered = posts
    postsFiltered = posts.filter(post => {
      return (
        post.title.toLowerCase().includes(search.toLowerCase())
        || post.body.toLowerCase().includes(search.toLowerCase())
      )
    })
    setSearchResults(postsFiltered.reverse())
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const post = {
      id,
      title: postTitle,
      datetime,
      body: postBody
    }

    try {
      const response = await api.post('/posts', post)
      const newPosts = [...posts, response.data]
      setPosts(newPosts)
      setPostTitle('')
      setPostBody('')
      navigate(`/`)
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = {
      title: editTitle,
      datetime,
      body: editBody
    }

    try {
      const response = await api.patch(`/posts/${id}`, updatedPost)
      setPosts(posts.map(post => post.id === id ? { ...post, ...updatedPost } : post))
      setEditTitle('')
      setEditBody('')
      navigate('/')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const newPosts = posts.filter(post => post.id.toString() !== id.toString())
      setPosts(newPosts)
      navigate('/')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <div className="App">
      <Header title="Simple Blog App" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={
          <Home
            posts={searchResults}
          />
        } />
        <Route path="/post" element={
          <NewPost
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
          />}
        />
        <Route path="/edit/:id" element={
          <EditPost
            posts={posts}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
            handleEdit={handleEdit}
          />}
        />
        <Route path="/post/:id" element={
          <PostPage
            posts={posts}
            handleDelete={handleDelete}
          />
        } />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
