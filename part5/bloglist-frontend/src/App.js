import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import User from "./components/User";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Error: Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <div className="login--container">
        <h2 className="login--title">Log in to application</h2>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div className="input--container">
            username
            <input
              type="text"
              value={username}
              name="Username"
              placeholder="Type your username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div class="input--container">
            password
            <input
              type="password"
              value={password}
              name="Password"
              placeholder="Type your password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button className="login--button" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="blogs--container">
      <h2 className="blogs--title">blogs</h2>

      <User key={user.id} user={user}></User>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
