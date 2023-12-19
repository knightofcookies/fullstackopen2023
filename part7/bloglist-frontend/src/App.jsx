import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import loginService from './services/login'
import LoginStatus from './components/LoginStatus'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { setErrorNotification } from './reducers/errorNotificationReducer'
import { setSuccessNotification } from './reducers/successNotificationReducer'
import { setBlogs, appendBlog, replaceBlog, deleteBlog } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      if (!username) {
        dispatch(setErrorNotification('Username cannot be blank', 5))
        return
      }
      if (!password) {
        dispatch(setErrorNotification('Password cannot be blank', 5))
        return
      }

      const rUser = await loginService.login({ username, password })
      dispatch(setUser(rUser))
      blogService.setToken(rUser.token)
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(rUser))
      setUsername('')
      setPassword('')
      dispatch(setSuccessNotification(`Successfully logged in as ${rUser.username}`, 5))
    } catch (exception) {
      dispatch(setErrorNotification('Wrong credentials', 5))
    }
  }

  const handleLogout = (event) => {
    try {
      window.localStorage.removeItem('loggedBlogListUser')
      dispatch(setUser(null))
      blogService.setToken(null)
    } catch (exception) {
      dispatch(setErrorNotification('Sorry, we had trouble logging you out', 5))
    }
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()

    try {
      blogService.setToken(user.token)
      const savedBlog = await blogService.createBlog(newBlog)
      savedBlog.user = {
        name: user.name,
        username: user.username,
        id: user.id
      }
      dispatch(appendBlog(savedBlog))
      const msg = `A new blog ${savedBlog.title} by
      ${savedBlog.author} has been added`
      dispatch(setSuccessNotification(msg, 5))
    } catch (exception) {
      console.error(exception)
      dispatch(setErrorNotification('Error : Check console for details', 5))
    }
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      blogService.setToken(user.token)
      await blogService.updateBlog(updatedBlog)
      dispatch(replaceBlog(updatedBlog))
    } catch (exception) {
      dispatch(setErrorNotification(`Error processing your like on ${blog.title}`, 5))
    }
  }

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
        blogService.setToken(user.token)
        await blogService.deleteBlog(blog.id)
        dispatch(deleteBlog(blog.id))
      }
    } catch (exception) {
      dispatch(setErrorNotification(`Error deleting ${blog.title}`, 5))
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  useEffect(() => {
    if (!user) {
      return
    }
    blogService.setToken(user.token)
    try {
      blogService.getAll().then(blogs =>
        dispatch(setBlogs(blogs))
      )
    } catch (exception) {
      console.error(exception)
      dispatch(setErrorNotification('Error : Check console for details', 5))
    }
  }, [user])

  return (
    <div>
      <ErrorNotification />
      <SuccessNotification />
      <h1>Blog List</h1>
      <Login
        user={user}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
      <LoginStatus user={user} handleLogout={handleLogout} />
      <br />
      <Togglable buttonLabel='New Blog' buttonId='newBlogButton' ref={blogFormRef} user={user}>
        <BlogForm addBlog={addBlog} user={user} />
        <br />
      </Togglable>
      <br />
      <Blogs user={user} handleLike={handleLike} handleDelete={handleDelete} />
    </div>
  )
}

export default App
