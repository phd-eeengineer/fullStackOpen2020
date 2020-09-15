import React, { useState, useEffect, useRef } from 'react'
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

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>  setBlogs( blogs )
    )  
  }, []) // boş liste olarak verilirse sadece ilk çalışmada burası çalışır
  

  // to sort the blogs according to like values
  blogs.sort(function(a,b){
    return b.likes-a.likes;
  })

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
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>          
  )

  const buildBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

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
          text: `${error.response.data.error}`,
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
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={buildBlog}/>
    </Togglable>
  )

  const handleLikesOf = (id) => {
    const blog = blogs.find(b => b.id === id)

    blog.likes+=1
    const changedBlog = { ...blog, likes: blog.likes }

    blogService
    .update(id, {
      title:changedBlog.title,
      author: changedBlog.author,
      url:changedBlog.url,
      likes: changedBlog.likes,
      user: changedBlog.user.id  
    })
    .then(returnedBlog => {
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    })
      .catch(error => {
        setMessage({
          text: `Error occured. Blog '${blog.title}' likes cannot be changed.`,
          type: "success"
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)     
      })
  }

  const removeTheBlog = (id) => {
    const blog = blogs.find(b => b.id === id)

    if (window.confirm(`Remove blog '${blog.title}' by '${blog.author}'?`)) {
      blogService
        .remove(id)
        .then(() => {
          setMessage({ 
            text: `Deleted '${blog.title}' by '${blog.author}'`, 
            type: 'success'
          })
          setBlogs(blogs.filter(p => p.id !== id).sort((a, b) => b.likes - a.likes))
        })
        .catch(error => {
          setMessage({ 
            text: `${error.response.data.error}`, 
            type: 'error' 
          })
        })
    }
  }

  return (
    <div>
      {user === null ? loginForm() :
        <div>
          <h2>blogs</h2>
          <Notification message={message} />
          <div>
            {user.name} logged-in 
            <button id="logout-button"  onClick = { () => logoutFunction()}>logout</button>
          </div>
          <div>
            {blogForm()}
          </div>
          <div>
            { blogs.map(blog =>
              <Blog 
                key={blog.id} 
                blog={blog}
                user={user}
                handleLikes = {() => handleLikesOf(blog.id)}
                removeBlog = {() => removeTheBlog(blog.id)} />
            )}
          </div>
        </div>
      } 
    </div>
  )
}

export default App