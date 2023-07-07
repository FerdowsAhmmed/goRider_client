import { useState, useEffect } from "react";
import BlogCard from "../components/Pages/BlogPageComp/BlogCard";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import TopNav from "../components/Shared/TopNavBar";
import Footer from "../components/Shared/Footer";
import LazyLoad from "react-lazyload";

const BlogPage = () => {
  const [sortedBlogs, setSortedBlogs] = useState([]);
  const [heroBlogs, setHeroBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);

  useEffect(() => {
    fetch("/blogs.json")
      .then((response) => response.json())
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.published_date) - new Date(a.published_date)
        );
        setSortedBlogs(sorted.slice(3));
        setHeroBlogs(sorted.slice(0, 3));
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <TopNav />
      <div className="bg-light min-h-screen py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <Swiper
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
            slidesPerView={1}
            spaceBetween={20}
            loop
          >
            {heroBlogs.map((blog) => (
              <SwiperSlide key={blog._id} className="w-full">
                <div
                  className="relative h-80 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: `url(${blog.picture})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 rounded-lg"></div>
                  <div className="absolute inset-0 flex flex-col justify-center items-center px-6">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {blog.heading}
                    </h2>
                    <p className="text-tertiary">
                      Published by{" "}
                      <span className="text-secondary">{blog.author_name}</span>
                    </p>
                    <Link
                      to={`/blogs/${blog._id}`}
                      state={blog}
                      className="cursor-pointer mt-4 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-80"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary my-8">All Blogs</h2>
            {currentBlogs.map((blog) => (
              <div key={blog._id} className="my-8">
                <LazyLoad offset={100}>
                  <BlogCard blog={blog} />
                </LazyLoad>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <nav className="space-x-2" aria-label="Pagination">
              {Array.from({
                length: Math.ceil(sortedBlogs.length / blogsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  className={`btn ${
                    currentPage === index + 1 ? "btn-primary" : "btn-secondary"
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
