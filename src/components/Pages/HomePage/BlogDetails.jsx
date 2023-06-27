import { useLocation } from "react-router-dom";
import TopNav from "../../Shared/TopNavBar";

const BlogDetails = () => {
  const location = useLocation();
  const blog = location.state;

  if (!blog) {
    return <p>No blog data found.</p>;
  }

  return (
    <>
      <TopNav />
      <div className="bg-light min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={blog.picture}
              alt={blog.heading}
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
            <div className="px-6 py-8">
              <h2 className="text-3xl font-bold text-primary mb-4">
                {blog.heading}
              </h2>
              <p className="text-sm text-tertiary mb-6">
                Published on{" "}
                {new Date(blog.published_date).toLocaleDateString()} by{" "}
                <span className="text-secondary">{blog.author_name}</span>
              </p>
              <p className="text-secondary">{blog.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
