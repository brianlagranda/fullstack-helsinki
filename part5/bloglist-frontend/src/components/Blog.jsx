import TrashIcon from '../img/icons/delete.svg';
import ThumbsUpEmpty from '../img/icons/thumbsUpEmpty.svg';
import ThumbsUpFilled from '../img/icons/thumbsUpFilled.svg';

import { useState } from 'react';
import Button from './Button';

const Blog = ({ blog, handleLikeClick, handleRemoveClick, user }) => {
  const [viewWholeBlog, toggleWhole] = useState(false);
  const [liked, setLiked] = useState(false);
  const label = viewWholeBlog ? 'Hide' : 'View';

  const showRemoveButton =
    user && blog.user && user.username === blog.user.username;

  const handleClick = (id, liked) => {
    setLiked(!liked);
    handleLikeClick(id);
  };

  return (
    <li className='w-full bg-slate-100/10 border-slate-200/20 border-2 shadow-xl rounded-md flex flex-col p-2 mb-4'>
      <h3 className='text-lg text-center font-bold'>{blog.title}</h3>
      <h4 className='text-sm text-center mb-4'>by {blog.author}</h4>
      <Button onClick={() => toggleWhole(!viewWholeBlog)} text={label}></Button>
      {viewWholeBlog && (
        <div className='bg-emerald-200 rounded-md mt-2 p-2 flex flex-col items-center'>
          <span className='font-bold text-sm'>URL</span>
          <span className='break-all mb-2'>{blog.url}</span>

          <span className='flex gap-2 justify-center items-start'>
            Likes <span className='font-bold'>{blog.likes}</span>
            <button onClick={() => handleClick(blog.id, liked)}>
              {liked ? (
                <img
                  src={ThumbsUpFilled}
                  alt='Delete button'
                  className='w-5 h-auto'
                ></img>
              ) : (
                <img
                  src={ThumbsUpEmpty}
                  alt='Delete button'
                  className='w-5 h-auto'
                ></img>
              )}
            </button>
          </span>

          <h4 className='text-sm text-end p-2'>{blog.author}</h4>
          {showRemoveButton && (
            <div>
              <button onClick={() => handleRemoveClick(blog.id)}>
                <img
                  src={TrashIcon}
                  alt='Delete button'
                  className='w-5 h-auto'
                ></img>
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default Blog;
