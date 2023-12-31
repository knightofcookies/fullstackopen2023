const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}, 10000)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 10000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 10000)

test('blogs are returned with id not _id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
}, 10000)

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Wa',
    author: 'Authorwa',
    likes: 999,
    url: 'foo/bar'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'Wa'
  )
}, 10000)

test('likes defaults to 0', async () => {
  const newBlog = {
    title: 'Wow',
    author: 'Wowman Wowson'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect(res => res.body.likes === 0)
}, 10000)

test('returns 400 if title is missing', async () => {
  const newBlog = {
    author: 'Guy Ritchie'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('returns 400 if author is missing', async () => {
  const newBlog = {
    title: 'Star Something'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('deletes a blog', async () => {
  const newBlog = {
    title: 'No',
    author: 'Nay nayest'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)

  const id = response.body.id

  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).not.toContain(
    'No'
  )
}, 10000)

test('updates a blog', async () => {
  const newBlog = {
    title: 'Yes',
    author: 'Yes yesser'
  }

  const newerBlog = {
    title: 'Yes',
    author: 'Yesh'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)

  const id = response.body.id

  const updateResponse = await api
    .put(`/api/blogs/${id}`)
    .send(newerBlog)
    .expect(200)

  expect(updateResponse.body.id).toBe(id)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const authors = blogsAtEnd.map(b => b.author)
  expect(authors).toContain(
    'Yesh'
  )
}, 10000)

afterAll(async () => {
  await mongoose.connection.close()
})
