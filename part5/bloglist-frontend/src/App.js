import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import User from "./components/User";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

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
      setNotificationMessage("Error: Wrong credentials");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  if (user === null) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
        notificationMessage={notificationMessage}
      />
    );
  }

  const addNewBlog = (e) => {
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
            setNotificationMessage(
              `${isDuplicated.name} has been succesfully updated`
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setNotificationMessage(
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

      blogFormRef.current.toggleVisibility();

      blogService.create(newBlog).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
        setNotificationMessage(`${newBlog.title} has been succesfully added`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    }
  };

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

      <Notification message={notificationMessage} />

      <User key={user.id} user={user} />

      <Togglable
        buttonLabel="Create new blog"
        btn="btn-createBlog"
        ref={blogFormRef}
      >
        <BlogForm
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleUrlChange={handleUrlChange}
          addNewBlog={addNewBlog}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
