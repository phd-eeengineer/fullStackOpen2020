const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)


const User = require('../models/user')
const Blog = require('../models/blog')

describe('only blog router tests', () => {
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
    const token = process.env.TOKEN

    const newBlog = {
      title: 'Test blog',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu',
      likes: 5,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles =  response.body.map(n => n.title)
    expect(titles).toContain('Test blog')
  })
  
  test('a blog without like property is added', async () => {
    const token = process.env.TOKEN

    const newBlog = {
      title: 'A blog like property',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles =  response.body.map(n => n.title)
    expect(titles).toContain(
      'A blog like property'
    )
  })
  
  test('blog without title and url properties is not added', async () => {
    const token = process.env.TOKEN

    const newBlog = { 
      author: "Robert C. Martin", 
      likes: 3
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
    
      const blogsAtEnd = await helper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('adding a blog fails without autorization token', async () => {

    const newBlog = { 
      author: "Robert C. Martin", 
      likes: 3
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
    
      const blogsAtEnd = await helper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  
  test('delete request succeeds with status code 204 if id is valid', async () => {
    const token = process.env.TOKEN

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
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
})

describe('only user router tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mehmet',
      name: 'Mehmet Kurt',
      password: 'selam',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('adding a new user that is conteined in db', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'password',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('adding a new user without username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
//      username: 'root',
      name: 'Superuser',
      password: 'password',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('adding a new user that username lenght is smaller than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'password',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('adding a new user that password lenght is smaller than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'romanya',
      name: 'Romen',
      password: 'pa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 character')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('adding a new user without a password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'romanya',
      name: 'Romen',
  //    password: 'pa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

