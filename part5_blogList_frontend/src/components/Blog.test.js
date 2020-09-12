import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component

beforeEach(() => {
    const testUser = {
        id: '1234567890',
        username: 'test',
        name: 'Test User',
        password: 'test'
    }
    
    const testBlog = {
        title: 'Test title',
        author: 'Test Author',
        url: "www.test.com",
        likes: 0,
        user: testUser
    }

    component = render(
        <Blog blog = {testBlog} user = {testUser} />
    )
  })

// EX 5.13
test('renders content - hide details', () => {
    expect(component.container.querySelector('.renderBlog')).toBeDefined()
    expect(component.container.querySelector('.blogTitleAuthor')).toBeDefined()
    expect(component.container).toHaveTextContent('Test title')
    expect(component.container).toHaveTextContent('Test Author')

    const divTitle = component.container.querySelector('.blogTitleAuthor')
    expect(divTitle).not.toHaveStyle('display: none')

    const divDetails = component.container.querySelector('.blogDetails')
    expect(divDetails).toHaveStyle('display: none')
})


// EX 5.14
test('show details after clicking button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const divDetails = component.container.querySelector('.blogDetails')
    expect(divDetails).not.toHaveStyle('display: none')
})


