import { useSelector } from "react-redux"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = useSelector(state => {
    if(state.notification !== '') {
      return state.notification
    }
    return null
  })

  if(!notification) {
    return null
  }

  return (
    <div style={style}>
      { notification }
    </div>
  )
}

export default Notification
