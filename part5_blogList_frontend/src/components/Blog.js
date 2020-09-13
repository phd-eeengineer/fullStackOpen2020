import React, { useState } from 'react'

const Blog = ({ blog, user, handleLikes, removeBlog}) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideComponent = { display: visible ? 'none' : '' }
  const showComponent = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className = "renderBlog">
      <div className = "blogTitleAuthor" style={hideComponent}>
        <div style = {blogStyle}>
          {blog.title} {blog.author}
          <button id="view-button" onClick={toggleVisibility}> view </button>
        </div>
      </div>
      <div  className = "blogDetails" style={showComponent}>
        <div style = {blogStyle}>
          <div>{ blog.title } { blog.author }
            <button id="hide-button" onClick={toggleVisibility}> hide </button>
          </div>
          <div>{ blog.url }</div>
          <div>likes { blog.likes }
            <button id="like-button" onClick={ handleLikes }> like </button>
          </div>
          <div>{ blog.user.name }</div>
          { user !== null && user.name === blog.user.name &&
            <div style={showComponent}>
              <button id="remove-button" onClick={ removeBlog }> remove </button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Blog