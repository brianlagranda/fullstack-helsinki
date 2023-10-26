import { useState } from 'react';
import Button from './Button';

const Blog = ({ blog, handleLikeClick, handleRemoveClick, user }) => {
  const [viewWholeBlog, toggleWhole] = useState(false);
  const label = viewWholeBlog ? 'Hide' : 'View';

  const showRemoveButton =
    user && blog.user && user.username === blog.user.username;

  return (
    <li className='bg-indigo-900/40 mb-2 p-2 border-indigo-500/50 border-2 rounded-md'>
      <span>
        {blog.title} {'▪'}{' '}
      </span>
      <span>{blog.author}</span>
      <Button onClick={() => toggleWhole(!viewWholeBlog)} text={label}></Button>
      {viewWholeBlog && (
        <div className='blog-content'>
          {blog.url}
          <div>
            Likes {blog.likes}
            <Button
              onClick={() => handleLikeClick(blog.id)}
              text='Like'
            ></Button>
          </div>
          {blog.author}
          {showRemoveButton && (
            <div>
              <Button
                onClick={() => handleRemoveClick(blog.id)}
                text='Remove'
              ></Button>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default Blog;
