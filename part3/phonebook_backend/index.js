const express = require('express')
const app = express()

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Maria Mat",
      "number": "111- 232 33 44",
      "id": 9
    },
    {
      "name": "Julia Bor",
      "number": "111 333 44 55",
      "id": 10
    }
  ]

  app.get('/', (request, response) => {
    response.send('<h1>Phonebook 2</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/info', (request, response) => {
    const arrLen = persons.length
    const date = new Date()
    response.send("<div>Phonebook has info for " + arrLen + " people</div>"
     +"<br>"+"<div>" + date + "</div>")
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })