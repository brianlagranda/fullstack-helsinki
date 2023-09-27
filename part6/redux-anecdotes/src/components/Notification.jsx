import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  console.log(notification);

  if (!notification || !notification.message) {
    return null;
  }

  return (
    <div className='py-2 my-3 px-2 rounded bg-green-300/20 shadow-lg shadow-black-500/50'>
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
