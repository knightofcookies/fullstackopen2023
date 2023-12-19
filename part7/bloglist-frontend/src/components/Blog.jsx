import { useState } from 'react'
import BlogDelete from './BlogDelete'

const Blog = ({ blog, handleLike, user, handleDelete }) => {
  const [detailedView, setDetailedView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (!detailedView) {
    return (
      <div style={blogStyle} className='blogDiv'>
        {blog.title} — {blog.author} <button onClick={() => setDetailedView(!detailedView)}>View</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className='blogDiv'>
        <p>{blog.title} <button onClick={() => setDetailedView(!detailedView)}>Hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button className='blogLikeButton' onClick={() => handleLike(blog)}>Like</button></p>
        <p>{blog.author}</p>
        <BlogDelete user={user} handleDelete={handleDelete} blog={blog} />
      </div>
    )
  }
}

export default Blog
