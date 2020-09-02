import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []) // boş liste olarak verilirse sadece ilk çalışmada burası çalışr

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setMessage({
        text: `Logged-in ${user.name}`,
        type: "success"
      })
      setTimeout(() => { setMessage(null) }, 3000)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({
        text: 'Wrong username or password',
        type: "error"
      })
      setTimeout(() => { setMessage(null) }, 3000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>          
  )

  const addBlog = (blogObject) => {
  
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage({
          text: `a new blog '${returnedBlog.title}' by '${returnedBlog.author}' added`,
          type: "success"
        })
        setTimeout(() => { setMessage(null) }, 3000)
      })
      .catch(error => {
        setMessage({
          test: `${error.response.data.error}`,
          type: "error"
        })
        setTimeout(() => { setMessage(null) }, 5000)
      })
  }

  const logoutFunction = (event) => { 
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className= {message.type} >
        {message.text}
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel="new note" >
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div>
      {user === null ? loginForm() :
        <div>
          <h2>blogs</h2>
          <Notification message={message} />
          <p>
            {user.name} logged-in <button 
            onClick = { () => logoutFunction()}>logout</button>
          </p>
          <p>
            {blogForm()}
          </p>
          <div>
            { blogs.map(blog =>
              <Blog 
                key={blog.id} 
                blog={blog}
                viewDetail = {() => {}} />
            )}
          </div>
        </div>
      } 
    </div>
  )
}

export default App