const BlogForm = ({
  newTitle,
  newAuthor,
  newUrl,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  addNewBlog,
}) => {
  return (
    <form onSubmit={addNewBlog}>
      <div className="input--container">
        Title: <input required value={newTitle} onChange={handleTitleChange} />
      </div>
      <div className="input--container">
        Author:{" "}
        <input required value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div className="input--container">
        URL: <input value={newUrl} onChange={handleUrlChange} />
      </div>
      <button className="create--button" type="submit">
        create
      </button>
    </form>
  );
};

export default BlogForm;
