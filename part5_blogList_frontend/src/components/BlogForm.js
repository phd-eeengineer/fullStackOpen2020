import React, {useState} from 'react' 

const BlogForm = ({createBlog}) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [blogUrl, setBlogUrl] = useState("")

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: blogUrl,
    })
    setTitle('')
    setAuthor('')
    setBlogUrl('')
  }

    return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: 
            <input
              type="text"
              value = {title}    //{username}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
          author: 
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url: 
            <input
            type="text"
            value={blogUrl}
            name="Author"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>          
  )}

  export default BlogForm