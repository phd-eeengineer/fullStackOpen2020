const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.blogs
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
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles =  response.body.map(n => n.title)
  expect(titles).toContain(
    'This is added'
  )
})

test('a post request without like property', async () => {
  const newBlog = {
    title: 'A blog like property',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles =  response.body.map(n => n.title)
  expect(titles).toContain(
    'A blog like property'
  )
})

test('a post request without title property', async () => {
  const newBlog = {
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Bad REquest')
})

afterAll(() => {
  mongoose.connection.close()
})

