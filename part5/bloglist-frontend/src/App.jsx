import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginStatus from './components/LoginStatus'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      if (!username) {
        setErrorMessage('Username cannot be blank')
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        return
      }
      if (!password) {
        setErrorMessage('Password cannot be blank')
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        return
      }

      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setSuccessMessage(`Successfully logged in as ${user.username}`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    try {
      window.localStorage.removeItem('loggedBlogListUser')
      setUser(null)
      blogService.setToken(null)
    } catch (exception) {
      setErrorMessage('Sorry, we had trouble logging you out')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    try {
      blogService.setToken(user.token)
      const savedBlog = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(savedBlog))
      const msg = `A new blog ${savedBlog.title} by
      ${savedBlog.author} has been added`
      setSuccessMessage(msg)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } catch (exception) {
      console.error(exception)
      setErrorMessage('Error : Check console for details')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [])

  return (
    <div>
      <Notification message={errorMessage} notificationStyle='error' />
      <Notification message={successMessage} notificationStyle='success' />
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
      <BlogForm
        blogTitle={blogTitle} setBlogTitle={setBlogTitle}
        blogAuthor={blogAuthor} setBlogAuthor={setBlogAuthor}
        blogUrl={blogUrl} setBlogUrl={setBlogUrl}
        addBlog={addBlog} user={user} />
      <Blogs user={user} blogs={blogs} />
    </div>
  )
}

export default App
