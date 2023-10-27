import Button from './Button';

const handleLogout = () => {
  window.localStorage.removeItem('loggedBlogappUser');
  window.location.reload();
};

const User = ({ user }) => (
  <div className='flex gap-x-2 items-center justify-center flex-wrap w-full'>
    <b>{user.name}</b>
    <div className=' text-xs'>
      <Button onClick={handleLogout} text='Log out' btn='btn-logout' />
    </div>
  </div>
);

export default User;
