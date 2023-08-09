import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import User from "./components/User";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
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
          <div className="input--container">
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

  const addPhoneNumber = (e) => {
    e.preventDefault();

    const isDuplicated = blogs.find((blog) => blog.title === newTitle);

    if (isDuplicated) {
      const confirmation = window.confirm(
        `${newTitle} is already in your blogs, check title please`
      );

      if (confirmation) {
        const updatedBlog = { ...isDuplicated, title: newTitle };

        blogService
          .update(isDuplicated.id, updatedBlog)
          .then((returnedBlog) => {
            setBlogs(
              blogs.map((blog) =>
                blog.id === returnedBlog.id ? returnedBlog : blog
              )
            );
            setNewTitle("");
            setNewAuthor("");
            setNewUrl("");
            setErrorMessage(
              `${isDuplicated.name} has been succesfully updated`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `Error: Information of ${isDuplicated.title} has already been removed from server`
            );
          });
      }
    } else {
      const newBlog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      };

      blogService.create(newBlog).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
        setErrorMessage(`${newBlog.title} has been succesfully added`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    }
  };

  console.log(blogs);

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setNewAuthor(e.target.value);
  };

  const handleUrlChange = (e) => {
    setNewUrl(e.target.value);
  };

  return (
    <div className="blogs--container">
      <h2 className="blogs--title">blogs</h2>

      <User key={user.id} user={user} />

      <BlogForm
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        addPhoneNumber={addPhoneNumber}
      />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
