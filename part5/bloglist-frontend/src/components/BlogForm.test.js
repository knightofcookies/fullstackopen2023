import BlogForm from './BlogForm'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  test('form passes right details to event handler', async () => {
    const mockHandler = jest.fn()
    const mockUser = {
      name: 'John Doe',
      username: 'johndoe1933',
      id: 'dummyid123',
      token: 'thisisnotjwt678'
    }

    const container = render(
      <BlogForm
        user={mockUser}
        addBlog={mockHandler}
      />
    ).container

    const user = userEvent.setup()

    const titleInput = container.querySelector('.titleInput')
    const authorInput = container.querySelector('.authorInput')
    const urlInput = container.querySelector('.urlInput')
    const addButton = screen.getByText('Add')

    await user.type(titleInput, 'Hello World')
    await user.type(authorInput, 'Tim Berners Lee')
    await user.type(urlInput, 'example.com/endpoint.html')
    await user.click(addButton)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('Hello World')
    expect(mockHandler.mock.calls[0][0].author).toBe('Tim Berners Lee')
    expect(mockHandler.mock.calls[0][0].url).toBe('example.com/endpoint.html')
  })
})
