import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary pt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="text-white">
          <h3 className="text-xl text-center border-b-2 rounded-lg font-bold mb-4">About Us</h3>
          <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at feugiat justo.</p>
        </div>
        <div className="text-white">
          <h3 className="text-xl text-center border-b-2 rounded-lg font-bold mb-4">Services</h3>
          <ul className="space-y-2">
            <li className="hover:text-secondary transition-colors duration-300">Service 1</li>
            <li className="hover:text-secondary transition-colors duration-300">Service 2</li>
            <li className="hover:text-secondary transition-colors duration-300">Service 3</li>
            <li className="hover:text-secondary transition-colors duration-300">Service 4</li>
          </ul>
        </div>
        <div className="text-white">
          <h3 className="text-xl text-center border-b-2 rounded-lg font-bold mb-4">Contact Us</h3>
          <p className="text-sm">123 Main Street, City</p>
          <p className="text-sm">Phone: 123-456-7890</p>
          <p className="text-sm">Email: info@example.com</p>
        </div>
        <div className="text-white">
          <h3 className="text-xl text-center border-b-2 rounded-lg font-bold mb-4">Follow Us</h3>
          <ul className="space-y-2 flex items-center justify-around">
            <li className="hover:text-secondary transition-colors duration-300"><FaFacebookF /></li>
            <li className="hover:text-secondary transition-colors duration-300"><FaTwitter /></li>
            <li className="hover:text-secondary transition-colors duration-300"><FaInstagram /></li>
            <li className="hover:text-secondary transition-colors duration-300"><FaLinkedinIn /></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white bg-dark mt-10 text-white text-center py-6">
        &copy; {new Date().getFullYear()} Go Rider. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
