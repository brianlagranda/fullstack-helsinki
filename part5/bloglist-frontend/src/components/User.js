import Button from "./Button";

const handleLogout = () => {
  window.localStorage.removeItem("loggedBlogappUser");
  window.location.reload();
};

const User = ({ user }) => (
  <div className="user">
    <b>{user.name}</b> logged in
    <Button onClick={handleLogout} text="Log out" btn="btn-logout" />
  </div>
);

export default User;
