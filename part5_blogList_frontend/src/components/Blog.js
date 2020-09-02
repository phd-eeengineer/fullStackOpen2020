import React, { useState } from 'react'

const Blog = (props) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hide}>
        <div style = {blogStyle}>
          {props.blog.title} {props.blog.author}
          <button onClick={toggleVisibility}> view </button>
        </div>
      </div>
      <div style={show}>
        <div style = {blogStyle}>
          <div>{props.blog.title} {props.blog.author}
          <button onClick={toggleVisibility}> hide </button></div>
          <div>{props.blog.url}</div>
          <div>likes {props.blog.likes}
          <button onClick={() => {}}> like </button></div>
          <div>{props.blog.name}</div>
        </div>
      </div>
    </div>
  )
}

export default Blog
