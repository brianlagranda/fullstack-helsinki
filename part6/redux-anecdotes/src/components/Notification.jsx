import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(( { notification } ) => notification)

  const hide = {
    display: 'none',
  }

  if(notification === ""){
    return(
      <div style={hide}>
        { notification }
      </div>
    )
  }else{
    return (
      <div className='py-2 my-3 px-2 rounded bg-green-300/20 shadow-lg shadow-black-500/50'>
        { notification }
      </div>
    )
  }
}

export default Notification