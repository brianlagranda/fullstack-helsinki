import { useState } from "react";
import Button from "./Button";

import blogService from "../services/blogs";

const Blog = ({ blog, handleLikeClick }) => {
  const [viewWholeBlog, toggleWhole] = useState(false);
  const label = viewWholeBlog ? "Hide" : "View";

  return (
    <div className="blogs">
      {blog.title}
      <Button
        onClick={() => toggleWhole(!viewWholeBlog)}
        text={label}
        btn="btn-view"
      ></Button>
      {viewWholeBlog && (
        <div className="blogs-content">
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
        </div>
      )}
    </div>
  );
};

export default Blog;
