import BlogSection from "./components/Pages/HomePage/BlogSection";
import CustomerReviews from "./components/Pages/HomePage/CustomerReviews";
import Header from "./components/Pages/HomePage/Header";
import HowWork from "./components/Pages/HomePage/HowWork";
import TrustedServices from "./components/Pages/HomePage/TrustedServices";
import TopNavBar from "./components/Shared/TopNavBar";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <TopNavBar />
        <Header />
        <HowWork />
        <TrustedServices />
        <CustomerReviews />
        <BlogSection />
      </div>
    </>
  );
}

export default App;
