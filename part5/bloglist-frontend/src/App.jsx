import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import Notification from './components/Notification';
import loginService from './services/login'
import LoginStatus from './components/LoginStatus';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password, })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setSuccessMessage(`Successfully logged in as ${user.username}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000);
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // eslint-disable-next-line no-unused-vars
  const handleLogout = (event) => {
    try {
      window.localStorage.removeItem('loggedBlogListUser')
      setUser(null)
      blogService.setToken(null)
    } catch(exception) {
      setErrorMessage('Sorry, we had trouble logging you out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification message={errorMessage} notificationStyle='error' />
      <Notification message={successMessage} notificationStyle='success' />
      <h1>Blogs</h1>
      <Login
        user={user}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin} 
      />
      <LoginStatus user={user} handleLogout={handleLogout} />
      <Blogs user={user} blogs={blogs} />
    </div>
  )
}

export default App