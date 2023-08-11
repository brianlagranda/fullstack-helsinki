import Button from "./Button";

const BlogForm = ({
  newTitle,
  newAuthor,
  newUrl,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  toggleVisibility,
  addNewBlog,
}) => {
  return (
    <form onSubmit={addNewBlog}>
      <div className="blog-input--container">
        Title: <input required value={newTitle} onChange={handleTitleChange} />
      </div>
      <div className="blog-input--container">
        Author:{" "}
        <input required value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div className="blog-input--container">
        URL: <input value={newUrl} onChange={handleUrlChange} />
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
