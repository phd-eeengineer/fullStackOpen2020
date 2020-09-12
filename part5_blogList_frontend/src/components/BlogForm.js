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
    <div className="blogFormDiv">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: 
            <input
              id = 'title'
              type="text"
              value = {title}    //{username}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
          author: 
            <input
            id = 'author'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url: 
            <input
            id = 'url'
            type="text"
            value={blogUrl}
            name="BlogUrl"  
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>          
  )}

  export default BlogForm