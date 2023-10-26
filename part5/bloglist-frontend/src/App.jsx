import { useState, useEffect, useRef } from 'react';

import NavBar from './components/NavBar';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import User from './components/User';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotificationMessage('Error: Wrong credentials');
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

  const createBlog = blogObj => {
    const isDuplicated = blogs.find(blog => blog.title === blogObj.title);

    if (isDuplicated) {
      const confirmation = window.confirm(
        `${blogObj.title} is already in your blogs, check title please`
      );

      if (confirmation) {
        const updatedBlog = { ...isDuplicated, title: blogObj.title };

        blogService
          .update(isDuplicated.id, updatedBlog)
          .then(returnedBlog => {
            setBlogs(
              blogs.map(blog =>
                blog.id === returnedBlog.id ? returnedBlog : blog
              )
            );
            setNotificationMessage(
              `${isDuplicated.name} has been succesfully updated`
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch(error => {
            setNotificationMessage(
              `Error: Information of ${isDuplicated.title} has already been removed from server`
            );
          });
      }
    } else {
      const newBlog = {
        title: blogObj.title,
        author: blogObj.author,
        url: blogObj.url,
      };

      blogFormRef.current.toggleVisibility();

      blogService.create(newBlog).then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        setNotificationMessage(`${newBlog.title} has been succesfully added`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    }
  };

  const handleLikeClick = async blogId => {
    try {
      const blogToUpdate = blogs.find(blog => blog.id === blogId);

      if (!blogToUpdate) {
        console.error('Blog not found for ID:', blogId);
        return;
      }

      const updatedBlog = {
        ...blogToUpdate,
        user: blogToUpdate.user.id,
        likes: blogToUpdate.likes + 1,
      };

      const updatedBlogs = blogs.map(blog =>
        blog.id === blogId ? updatedBlog : blog
      );

      setBlogs(updatedBlogs);

      await blogService.update(blogId, updatedBlog);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleRemoveClick = async blogId => {
    const blogToRemove = blogs.find(blog => blog.id === blogId);
    if (
      window.confirm(
        `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
      )
    ) {
      try {
        if (!blogToRemove) {
          console.error('Blog not found for ID:', blogId);
          return;
        }

        const blogsRemoved = blogs.filter(blog => blog.id !== blogId);

        setBlogs(blogsRemoved);

        await blogService.remove(blogId);
      } catch (error) {
        console.error('Error removing blog:', error);
      }
    }
  };

  blogs.sort((blogA, blogB) => (blogA.likes < blogB.likes ? 1 : -1));

  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className='flex items-center h-full min-h-screen w-screen bg-gradient-to-br from-emerald-400 to-emerald-800 p-4'>
        <section className='w-full bg-black/20 backdrop-blur-xl md:w-3/4 md:min-h-full grid grid-cols-1 grid-row-3 justify-items-center rounded-md p-2 mt-16 gap-4'>
          <h1 className='text-3xl font-bold row-span-1'>Blogs</h1>

          <Notification message={notificationMessage} />

          <User key={user.id} user={user} />

          <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>

          <ol className='flex-col'>
            {blogs.map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleLikeClick={handleLikeClick}
                handleRemoveClick={handleRemoveClick}
              />
            ))}
          </ol>
        </section>
      </main>
    </>
  );
};

export default App;
