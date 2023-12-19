const Login = props => {
  if (props.user) {
    return null
  }
  return (
    <form onSubmit={props.handleLogin}>
      <div>Username  <input
        id="username"
        type="text"
        value={props.username}
        name="Username"
        onChange={({ target }) => props.setUsername(target.value)}
        />
      </div>
      <div>Password  <input
        id="password"
        type="password"
        value={props.password}
        name="Password"
        onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <button id='loginButton' type="submit">Login</button>
    </form>
  )
}

export default Login
