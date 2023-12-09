const BlogForm = props => {
  if(!props.user) {
    return null
  }
  return (
    <form onSubmit={}>
      <div>
        title
        <input type="text" />
      </div>
      <div>
        author
        <input type="text" />
      </div>
      <div>
        url
        <input type="text" />
      </div>
    </form>
  )
}

export default BlogForm