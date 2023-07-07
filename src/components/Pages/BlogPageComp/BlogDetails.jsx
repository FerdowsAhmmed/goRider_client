import LazyLoad from "react-lazyload";
import { useLocation } from "react-router-dom";
import Footer from "../../Shared/Footer";
import TopNav from "../../Shared/TopNavBar";

const BlogDetails = () => {
  const location = useLocation();
  const blog = location.state;

  if (!blog) {
    return (
      <>
        <TopNav /> <p>No blog data found.</p>
      </>
    );
  }

  return (
    <>
      <TopNav />
      <div className="bg-light min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <LazyLoad offset={100}>
              <img
                src={blog.picture}
                loading="lazy"
                alt={blog.heading}
                className="w-full h-64 sm:h-80 md:h-96 object-cover"
              />
            </LazyLoad>
            <div className="px-6 py-8">
              <h2 className="text-3xl font-bold text-secondary mb-4">
                {blog.heading}
              </h2>
              <p className="text-sm text-tertiary mb-6">
                Published on{" "}
                {new Date(blog.published_date).toLocaleDateString()} by{" "}
                <span className="text-secondary">
                  <i> ~ {blog.author_name} </i>
                </span>
              </p>
              <p className="text-primary px-3 border-l-2">{blog.description}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;
