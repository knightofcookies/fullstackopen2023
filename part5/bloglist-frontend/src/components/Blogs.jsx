import Blog from './Blog'

const Blogs = props => {
  if(!props.user) {
    return null
  }
  return (
    <div>
      {props.blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />  
      )}
    </div>
  )
}

export default Blogs
