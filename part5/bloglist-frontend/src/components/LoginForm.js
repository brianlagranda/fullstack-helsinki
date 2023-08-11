import Notification from "./Notification";
import Button from "./Button";

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  errorMessage,
}) => {
  return (
    <div className="login--container">
      <h2 className="login--title">Login in to application</h2>

      <Notification message={errorMessage} />

      <form onSubmit={handleLogin}>
        <div className="input--container">
          username
          <input
            required
            value={username}
            placeholder="Type your username"
            onChange={handleUsernameChange}
          />
        </div>
        <div className="input--container">
          password
          <input
            required
            type="password"
            value={password}
            placeholder="Type your password"
            onChange={handlePasswordChange}
          />
        </div>
        <Button type="submit" text="Log in" btn="btn-login" />
      </form>
    </div>
  );
};

export default LoginForm;
