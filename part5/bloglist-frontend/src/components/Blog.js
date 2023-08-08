const Blog = ({ blog }) => (
  <div className="blogs">
    {blog.title} {blog.author}
  </div>
);

export default Blog;
