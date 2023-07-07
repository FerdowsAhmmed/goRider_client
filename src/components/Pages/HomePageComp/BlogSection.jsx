import { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import SectionHeader from "../../Shared/SectionHeader";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/blogs.json") // Assuming the blogs.json file is in the public folder
      .then((response) => response.json())
      .then((data) => {
        // Sort the blogs by published date
        const sortedBlogs = data.sort(
          (a, b) => new Date(b.published_date) - new Date(a.published_date)
        );
        setBlogs(sortedBlogs.slice(0, 3)); // Get the first 3 blogs
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <div className="min-h-full mb-10">
      <SectionHeader
        heading="Blogs"
        subheading="Stories, Tips, and Insights for the Ultimate Ride Sharing Experience"
      />
      <div className="container mx-auto grid gap-8 md:grid-cols-3">
        {blogs.map((blog) => (
          <Link
            key={blog.heading}
            to={`/blogs/${blog._id}`}
            state={blog}
            className="bg-light shadow-md rounded-lg p-6 overflow-hidden hover:shadow-lg transition-shadow relative group"
          >
            <LazyLoad offset={100}>
              <img
                src={blog.picture}
                alt={blog.heading}
                className="w-full h-40 object-cover rounded-md mb-4 transition-transform duration-300 group-hover:scale-105"
              />
            </LazyLoad>
            <div className="absolute inset-0 bg-primary bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <p className="text-success uppercase mb-4">{blog.type}</p>
            <h3 className="text-primary font-semibold text-lg mb-2">
              {blog.heading}
            </h3>
            <p className="text-tertiary mb-4">{blog.description}</p>
            <p className="text-sm text-secondary">
              Published on {new Date(blog.published_date).toLocaleDateString()}{" "}
              by <span className="text-blue-500">{blog.author_name}</span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
