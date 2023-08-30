import { useState } from "react";

import Button from "./Button";

const BlogForm = ({ createBlog, toggleVisibility }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setNewAuthor(e.target.value);
  };

  const handleUrlChange = (e) => {
    setNewUrl(e.target.value);
  };

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <div className="blog-input--container">
        Title: <input required value={newTitle} onChange={handleTitleChange} placeholder="write the title of the blog" id="blogNewTitle" />
      </div>
      <div className="blog-input--container">
        Author:{" "}
        <input required value={newAuthor} onChange={handleAuthorChange} placeholder="name of the author" id="blogNewAuthor" />
      </div>
      <div className="blog-input--container">
        URL: <input value={newUrl} onChange={handleUrlChange} placeholder="www.example.com" id="blogNewUrl" />
      </div>
      <Button
        onClick={toggleVisibility}
        type="submit"
        text="Create"
        btn="btn-create"
      />
    </form>
  );
};

export default BlogForm;
