import { useState } from 'react';

import Button from './Button';

const BlogForm = ({ createBlog, toggleVisibility }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleTitleChange = e => {
    setNewTitle(e.target.value);
  };

  const handleAuthorChange = e => {
    setNewAuthor(e.target.value);
  };

  const handleUrlChange = e => {
    setNewUrl(e.target.value);
  };

  const addBlog = e => {
    e.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  };

  return (
    <form
      onSubmit={addBlog}
      className='p-4 grid grid-cols-1 grid-rows-5 gap-2 bg-black/40 rounded-md'
    >
      <div>
        <span className='text-sm pl-2'>Title</span>
        <input
          value={newTitle}
          onChange={handleTitleChange}
          placeholder='write the title of the blog'
          id='blogNewTitle'
          className='w-full bg-gray-200 focus:bg-white p-1 px-2 focus:outline-1 focus:outline-slate-600 rounded-sm'
        />
      </div>
      <div>
        <span className='text-sm pl-2'>Author</span>
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
          placeholder='name of the author'
          id='blogNewAuthor'
          className='w-full bg-gray-200 focus:bg-white p-1 px-2 focus:outline-1 focus:outline-slate-600 rounded-sm'
        />
      </div>
      <div>
        <span className='text-sm pl-2'>URL</span>
        <input
          value={newUrl}
          onChange={handleUrlChange}
          placeholder='www.example.com'
          id='blogNewUrl'
          className='w-full bg-gray-200 focus:bg-white p-1 px-2 focus:outline-1 focus:outline-slate-600 rounded-sm'
        />
      </div>
      <div className='flex items-center'>
        <Button
          onClick={toggleVisibility}
          type='submit'
          text='Create'
          btn='btn-create'
        />
        <Button onClick={toggleVisibility} text='Cancel' btn='btn-cancel' />
      </div>
    </form>
  );
};

export default BlogForm;
