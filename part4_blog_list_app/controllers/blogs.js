const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
    })
})
  
blogsRouter.post('/', (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes
      })
  
    console.log("POST req",blog.hasOwnProperty('title')) 
      // ? blog.save().then(result => {
      //   response.status(201).json(result)})
      // : response.status(400).error('Bad Request')

      blog
        .save()
        .then(result => {
          response.status(201).json(result)
        })
})

  module.exports = blogsRouter