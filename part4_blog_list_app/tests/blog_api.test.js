const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 3 blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(3)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  
  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'This is added',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles =  response.body.map(n => n.title)
  expect(titles).toContain(
    'This is added'
  )
})

test('a blog without like property is added', async () => {
  const newBlog = {
    title: 'A blog like property',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles =  response.body.map(n => n.title)
  expect(titles).toContain(
    'A blog like property'
  )
})

test('blog without title and url properties is not added', async () => {
  const newBlog = { 
    author: "Robert C. Martin", 
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('updating a blog if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  let blogToUpdate = blogsAtStart[0]

  blogToUpdate.likes +=10

  const value = blogToUpdate.likes

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const updatedBlogInDb = blogsAtEnd.find(blog => blog.id === helper.initialBlogs[0]._id)
  expect(updatedBlogInDb.likes).toBe(value)
})

afterAll(() => {
  mongoose.connection.close()
})

