import React from 'react'

const Blog = ({ blog, viewDetail }) => (
  <div>
    {blog.title} {blog.author}
    <button onClick={viewDetail}> view </button>
  </div>
)

export default Blog
