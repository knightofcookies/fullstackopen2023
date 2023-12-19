import { useSelector } from 'react-redux'

const SuccessNotification = (props) => {
  const successNotification = useSelector(state => {
    return state.successNotification
  })

  if (successNotification === '') {
    return null
  }

  return (
    <div className='success'>
      {successNotification}
    </div>
  )
}

export default SuccessNotification
