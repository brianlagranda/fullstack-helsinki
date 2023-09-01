import PropTypes from "prop-types";

import Notification from "./Notification";
import Button from "./Button";

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  notificationMessage,
}) => {
  return (
    <div className="login--container">
      <h2 className="login--title">Log in</h2>

      <Notification message={notificationMessage} />

      <form onSubmit={handleLogin}>
        <div className="input--container">
          username
          <input
            required
            id="username"
            value={username}
            placeholder="Type your username"
            onChange={handleUsernameChange}
          />
        </div>
        <div className="input--container">
          password
          <input
            required
            id="password"
            type="password"
            value={password}
            placeholder="Type your password"
            onChange={handlePasswordChange}
          />
        </div>
        <Button id="btn-login" type="submit" text="Log in" btn="btn-login" />
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
