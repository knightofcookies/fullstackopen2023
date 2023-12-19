import Blog from './Blog'
import { useSelector } from 'react-redux'

const Blogs = props => {
  const blogs = useSelector(state => state.blogs)
  if (!props.user) {
    return null
  } else if (!blogs || blogs.length === 0) {
    return (
      <div>
        <p>There are no blogs to show</p>
        <p>Try logging out and then logging in again</p>
      </div>
    )
  }

  const sortByLikes = (a, b) => b.likes - a.likes
  const newBlogs = blogs.map(blog => blog)
  newBlogs.sort(sortByLikes)

  return (
    <div>
      <h2>List</h2>
      {newBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={props.handleLike} user={props.user} handleDelete={props.handleDelete} />
      )}
    </div>
  )
}

export default Blogs
