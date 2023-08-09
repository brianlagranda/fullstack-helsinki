const handleLogout = async () => {
  await window.localStorage.removeItem("loggedBlogappUser");
  window.location.reload();
};

const User = ({ user }) => (
  <div className="user">
    <b>{user.name}</b> logged in
    <button onClick={handleLogout} className="logout--button" type="submit">
      Log out
    </button>
  </div>
);

export default User;
