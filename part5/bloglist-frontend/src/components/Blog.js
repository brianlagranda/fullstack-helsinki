import { useState } from "react";
import Button from "./Button";

const Blog = ({ blog, handleLikeClick, handleRemoveClick, user }) => {
  const [viewWholeBlog, toggleWhole] = useState(false);
  const label = viewWholeBlog ? "Hide" : "View";

  const showRemoveButton =
    user && blog.user && user.username === blog.user.username;

  return (
    <div className="blog">
      {blog.title}
      <Button
        onClick={() => toggleWhole(!viewWholeBlog)}
        text={label}
        btn="btn-view"
      ></Button>
      {viewWholeBlog && (
        <div className="blog-content">
          {blog.url}
          <div>
            Likes {blog.likes}{" "}
            <Button
              onClick={() => handleLikeClick(blog.id)}
              text="Like"
              btn="btn-like"
            ></Button>
          </div>
          {blog.author}
          {showRemoveButton && (
            <div>
              <Button
                onClick={() => handleRemoveClick(blog.id)}
                text="Remove"
                btn="btn-like"
              ></Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
