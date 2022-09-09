import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState(posts)
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const navigate = useNavigate()

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const post = {
      id,
      title: postTitle,
      datetime,
      body: postBody
    }
    const newPosts = [...posts, post]
    setPosts(newPosts)
    navigate(`/post/${id}`)
  }

  const handleDelete = (id) => {
    const newPosts = posts.filter(post => post.id.toString() !== id.toString())
    setPosts(newPosts)
    navigate('/about')
  }

  return (
    <div className="App">
      <Header title="Simple Blog App" />
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
