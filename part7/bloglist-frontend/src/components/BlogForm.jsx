import { useState } from 'react'

const BlogForm = ({ user, addBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const saveBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
    addBlog(newBlog)
  }

  if (!user) {
    return null
  }
  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={saveBlog}>
        <div>
          Title  <input
            id="blogFormTitle"
            type="text"
            className='titleInput'
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          Author  <input
          id="blogFormAuthor"
            type="text"
            className='authorInput'
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          URL  <input
            id="blogFormUrl"
            type="text"
            className='urlInput'
            value={blogUrl}
            name="Url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button id='addBlogButton' type="submit">Add</button>
      </form>
    </div>
  )
}

export default BlogForm
