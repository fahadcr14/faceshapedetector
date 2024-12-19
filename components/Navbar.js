import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai'; // Importing the close icon
import Link from 'next/link';
const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true); // Assuming this state is used to toggle the navbar visibility

  // Memoize the handleScroll function to avoid unnecessary re-renders
  const handleScroll = useCallback(() => {
    // Update the state based on the previous value
    setLastScrollY(prevScrollY => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      return currentScrollY; // Return the updated scroll position
    });
  }, []); // Empty dependency array ensures the function is memoized

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  return (
    <nav
      className={`glowing-shadow-small fixed w-full z-50 top-0 left-0 backdrop-blur-xl rounded-xl shadow-2xl transition-transform duration-300 ${
        showNavbar ? 'transform translate-y-0' : 'transform -translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo - Left side */}
        <div className="text-2xl font-bold text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            <Link href="/"> Face Shape Detect</Link> 
          </span>
        </div>

        {/* Desktop Menu - Right side */}
        <div className="hidden md:flex space-x-4 text-white font-semibold text-center">
          <Link
            href="#features"
            className="  hover:text-black-dull transition-all duration-300 transform "
          >
            Features
          </Link>
          <Link
            href="#detect"
            className=" hover:text-black-dull transition-all duration-300 transform "
          >
            Detect
          </Link>
          <Link
            href="#reviews"
            className=" hover:text-black-dull transition-all duration-300 transform "
          >
            Reviews
          </Link>
        </div>

        {/* Mobile Menu - Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="space-y-1 "
          >
            <span className="block w-6 h-[4px] bg-white rounded-[20px]"></span>
            <span className="block w-6 h-[4px] rounded-[20px] bg-white"></span>
            <span className="block w-6 h-[4px] rounded-[20px] bg-white"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full-screen blur */}
      {isMobileMenuOpen && (
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-sm z-20 h-screen flex flex-col items-center justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute top-2 right-4 ">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white p-3 rounded-full transition-all duration-300 hover:bg-gray-200 p-4 z-50"
            >
              <AiOutlineClose size={28} /> {/* Using the cross icon from react-icons */}
            </button>
          </div>

          <div className="mt-24 font-bold flex flex-col text-center">

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="  bg-electric-indigo w-64  p-4 text-lg text-white py-3 px-6 rounded-xl mb-4 transition-all duration-300 hover:bg-gray-800 hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            href="#detect"
            className="bg-electric-indigo  w-64 bg-opacity-100 p-4 text-lg text-white py-3 px-6 rounded-xl mb-4 transition-all duration-300 hover:bg-gray-800 hover:text-gray-300"
          >
            Detect
          </Link>
          <Link
            href="#features"
            className="bg-electric-indigo w-64 bg-opacity-20 p-4 text-lg text-white py-3 px-6 rounded-xl mb-4 transition-all duration-300 hover:bg-gray-800 hover:text-gray-300"
          >
            Features
          </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
