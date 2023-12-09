const LoginStatus = props => {
  if(!props.user) {
    return null
  }
  return (
    <div>
      <p>Logged in as {props.user.name}</p>
      <button onClick={props.handleLogout}>Logout</button>
    </div>
  )
}

export default LoginStatus