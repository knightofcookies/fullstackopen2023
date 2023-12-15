import { useNotificationValue } from './NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5 
  }
  const content = useNotificationValue()
  if(content == '') {
    return null
  }
  return (
    <div style={style}>
      <p>{content}</p>
    </div>
  )
}

export default Notification
