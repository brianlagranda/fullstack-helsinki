import { useState } from "react";
import Button from "./Button";

const Blog = ({ blog }) => {
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
            Likes {blog.likes} <Button text="Like" btn="btn-like"></Button>
          </div>
          {blog.author}
        </div>
      )}
    </div>
  );
};

export default Blog;
