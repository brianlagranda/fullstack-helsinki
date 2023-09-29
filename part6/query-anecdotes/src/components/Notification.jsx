import { useContext } from 'react';
import NotificationContext from '../NotificationContext';

import { useCounterDispatch } from '../CounterContext';

const Notification = ({ notification }) => {
  const notificationValue = useNotificationValue();
  const dispatch = useNotificationDispatch();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return <div style={style}>dispatch({notification})</div>;
};

export default Notification;
