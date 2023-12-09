import Blog from './Blog'

const Blogs = props => {
  if (!props.user) {
    return null
  } else if(!props.blogs) {
    return (
      <div>
        <p>There are no blogs to show</p>
      </div>
    )
  }
  return (
    <div>
      <h2>List</h2>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs
