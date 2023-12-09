const LoginStatus = props => {
  if (!props.user) {
    return null
  }
  return (
    <div>
      Logged in as {props.user.name}  <button onClick={props.handleLogout}>Logout</button>
    </div>
  )
}

export default LoginStatus
