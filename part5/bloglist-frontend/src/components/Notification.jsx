const Notification = (props) => {
  if (props.message === '') {
    return null
  }

  return (
    <div className={props.notificationStyle}>
      {props.message}
    </div>
  )
}

export default Notification
