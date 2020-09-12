import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> check data of the new blog', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const input1 = component.container.querySelector('input[name="Title"]')
  const input2 = component.container.querySelector('input[name="Author"]')
  const input3 = component.container.querySelector('input[name="BlogUrl"]')
  
  const form = component.container.querySelector('form')

  fireEvent.change(input1, { 
    target: { value: 'title of blog' } 
  })

  fireEvent.change(input2, { 
    target: { value: 'author of blog' } 
  })

  fireEvent.change(input3, { 
    target: { value: 'url of blog' } 
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls[0][0])

  expect(createBlog.mock.calls[0][0].title).toBe('title of blog')
  expect(createBlog.mock.calls[0][0].author).toBe('author of blog')
  expect(createBlog.mock.calls[0][0].url).toBe('url of blog')
})