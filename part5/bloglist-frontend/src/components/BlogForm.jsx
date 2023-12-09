const BlogForm = props => {
  if (!props.user) {
    return null
  }
  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={props.addBlog}>
        <div>
          title
          <input
            type="text"
            value={props.blogTitle}
            name="Title"
            onChange={({ target }) => props.setBlogTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={props.blogAuthor}
            name="Author"
            onChange={({ target }) => props.setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={props.blogUrl}
            name="Url"
            onChange={({ target }) => props.setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default BlogForm
