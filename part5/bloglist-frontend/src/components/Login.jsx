const Login = props => {
  if(props.user) {
    return null
  }
  return (
    <form onSubmit={props.handleLogin}>
      <div>username 
        <input
        type="text"
        value={props.username}
        name="Username"
        onChange={({target}) => props.setUsername(target.value)}
        />
      </div>
      <div>password 
        <input
        type="text"
        value={props.password}
        name="Password"
        onChange={({target}) => props.setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login