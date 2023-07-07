import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog._id}`} state={blog} className="cursor-pointer">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="grid md:grid-cols-2">
          <div className="md:flex md:items-center">
            <LazyLoad offset={100}>
              <img
                src={blog.picture}
                alt={blog.heading}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </LazyLoad>
          </div>
          <div className="p-4 md:px-6 md:py-4">
            <h3 className="text-primary font-bold text-lg mb-2">
              {blog.heading}
            </h3>
            <p className="text-success uppercase text-sm my-4">{blog.type}</p>
            <p className="text-secondary text-sm mb-4">{blog.description}</p>
            <p className="text-tertiary text-xs">
              Published on {new Date(blog.published_date).toLocaleDateString()}{" "}
              by <span className="text-blue-500">{blog.author_name}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
