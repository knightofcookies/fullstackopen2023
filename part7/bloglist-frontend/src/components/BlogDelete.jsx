const BlogDelete = ({ user, handleDelete, blog }) => {
  if (!user || blog.user.id !== user.id) {
    return null
  }
  return (
    <button className='blogDeleteButton' onClick={() => handleDelete(blog)}>Delete</button>
  )
}

export default BlogDelete
