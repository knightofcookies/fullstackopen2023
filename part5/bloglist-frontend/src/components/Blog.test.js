import Blog from './Blog'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// https://stackoverflow.com/questions/52783144/how-do-you-test-for-the-non-existence-of-an-element-using-jest-and-react-testing

describe('<Blog />', () => {
  test('at start renders only title and author', () => {
    const blog = {
      title: 'Hello World',
      author: 'Tim Berners-Lee',
      url: 'example.com/endpoint.html',
      likes: 714
    }
    const user = {
      name: 'John Doe',
      username: 'johndoe1933',
      id: 'dummyid123',
      token: 'thisisnotjwt678'
    }
    const mockHandler = jest.fn()
    render(<Blog blog={blog} handleLike={mockHandler} handleDelete={mockHandler} user={user} />)

    const titleElement = screen.queryByText(blog.title, { exact: false })
    expect(titleElement).not.toBeNull()
    const authorElement = screen.queryByText(blog.author, { exact: false })
    expect(authorElement).not.toBeNull()
    const urlElement = screen.queryByText(blog.url, { exact: false })
    expect(urlElement).toBeNull()
    const likesElement = screen.queryByText(blog.likes, { exact: false })
    expect(likesElement).toBeNull()
  })

  test('after clicking the button renders url and likes too', async () => {
    const user = {
      name: 'John Doe',
      username: 'johndoe1933',
      id: 'dummyid123',
      token: 'thisisnotjwt678'
    }
    const blog = {
      title: 'Hello World',
      author: 'Tim Berners-Lee',
      url: 'example.com/endpoint.html',
      likes: 714,
      user
    }
    const mockHandler = jest.fn()
    render(<Blog blog={blog} handleLike={mockHandler} handleDelete={mockHandler} user={user} />)

    const dummyUser = userEvent.setup()
    const button = screen.getByText('View')
    await dummyUser.click(button)

    const titleElement = screen.queryByText(blog.title, { exact: false })
    expect(titleElement).not.toBeNull()
    const authorElement = screen.queryByText(blog.author, { exact: false })
    expect(authorElement).not.toBeNull()
    const urlElement = screen.queryByText(blog.url, { exact: false })
    expect(urlElement).not.toBeNull()
    const likesElement = screen.queryByText(blog.likes, { exact: false })
    expect(likesElement).not.toBeNull()
  })

  test('event handler is called twice if like button is clicked twice', async () => {
    const user = {
      name: 'John Doe',
      username: 'johndoe1933',
      id: 'dummyid123',
      token: 'thisisnotjwt678'
    }
    const blog = {
      title: 'Hello World',
      author: 'Tim Berners-Lee',
      url: 'example.com/endpoint.html',
      likes: 714,
      user
    }
    const mockHandler = jest.fn()
    render(<Blog blog={blog} handleLike={mockHandler} handleDelete={mockHandler} user={user} />)

    const dummyUser = userEvent.setup()
    const viewButton = screen.getByText('View')
    await dummyUser.click(viewButton)

    const likeButton = screen.getByText('Like')
    await dummyUser.click(likeButton)
    await dummyUser.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
