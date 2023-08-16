import { useState } from "react";
import Button from "./Button";

import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [viewWholeBlog, toggleWhole] = useState(false);
  const label = viewWholeBlog ? "Hide" : "View";

  const handleLikeClick = async (e) => {
    e.preventDefault();

    const blogId = blog.id;

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    await blogService.update(blogId, updatedBlog);
  };

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
              onClick={handleLikeClick}
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
