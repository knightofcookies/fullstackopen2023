import Blog from './Blog'

const Blogs = props => {
  if (!props.user) {
    return null
  } else if (!props.blogs) {
    return (
      <div>
        <p>There are no blogs to show</p>
        <p>Try logging out and then logging in again</p>
      </div>
    )
  }
  return (
    <div>
      <h2>List</h2>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={props.handleLike} user={props.user} handleDelete={props.handleDelete} />
      )}
    </div>
  )
}

export default Blogs
