import Button from './Button';

const handleLogout = () => {
  window.localStorage.removeItem('loggedBlogappUser');
  window.location.reload();
};

const User = ({ user }) => (
  <div className='flex gap-x-2 items-center justify-center flex-wrap w-full'>
    <b>{user.name}</b> logged in
    <Button onClick={handleLogout} text='Log out' btn='btn-logout' />
  </div>
);

export default User;
