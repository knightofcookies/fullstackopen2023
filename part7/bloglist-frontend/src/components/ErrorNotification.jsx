import { useSelector } from 'react-redux'

const ErrorNotification = (props) => {
  const errorNotification = useSelector(state => {
    return state.errorNotification
  })

  if (errorNotification === '') {
    return null
  }

  return (
    <div className='error'>
      {errorNotification}
    </div>
  )
}

export default ErrorNotification
