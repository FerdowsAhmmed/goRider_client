import LazyLoad from "react-lazyload";
import BlogSection from "../components/Pages/HomePageComp/BlogSection";
import CustomerReviews from "../components/Pages/HomePageComp/CustomerReviews";
import Header from "../components/Pages/HomePageComp/Header";
import HowWork from "../components/Pages/HomePageComp/HowWork";
import TrustedServices from "../components/Pages/HomePageComp/TrustedServices";
import Footer from "../components/Shared/Footer";
import TopNavBar from "../components/Shared/TopNavBar";

function HomePage() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <TopNavBar />
        <LazyLoad offset={100}>
          <Header />
        </LazyLoad>
        <LazyLoad offset={100}>
          <HowWork />
        </LazyLoad>
        <LazyLoad offset={100}>
          <TrustedServices />
        </LazyLoad>
        <LazyLoad offset={100}>
          <CustomerReviews />
        </LazyLoad>
        <LazyLoad offset={100}>
          <BlogSection />
        </LazyLoad>
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
