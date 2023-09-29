import { createContext, useReducer, useContext } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NOTIF_CREATED':
      return `anecdote '${state}' created`;
    case 'NOTIF_VOTED':
      return `anecdote '${state}' voted`;
    case 'NOTIF_CLEAR':
      return '';
    default:
      return state;
  }
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const NotificationContextProvider = props => {
  const [notification, notificationReducer] = useReducer(
    notificationReducer,
    ''
  );

  return (
    <NotificationContext.Provider value={[notification, notificationReducer]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

