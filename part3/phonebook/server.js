require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Entry = require('./models/entry')

const app = express()

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'))
app.use(express.static('dist'))

app.get('/api/persons', (request, response, next) => {
  Entry
    .find({})
    .then(entries => response.json(entries))
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Entry
    .findById(request.params.id)
    .then(entry => {
      if (entry) {
        response.json(entry)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Entry
    .findByIdAndDelete(request.params.id)
    .then(res => {
      console.log(res)
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.phone) {
    return response.status(400).json({
      error: 'name or phone missing'
    })
  }

  const entry = new Entry({
    name: body.name,
    phone: body.phone
  })

  entry
    .save()
    .then(savedEntry => response.status(201).json(savedEntry))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, phone } = request.body

  Entry
    .findByIdAndUpdate(request.params.id, { name, phone }, { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.get('/api/info', (request, response, next) => {
  Entry
    .find({})
    .then(res => response.send(`<p>Phonebook has info for ${res.length} people</p><p>${Date().toString()}</p>`))
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
