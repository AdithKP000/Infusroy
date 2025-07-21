import React, { useState, useEffect } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside or on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('nav')) {
        setIsOpen(false);
      }
    };

    const handleOrientationChange = () => {
      setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="bg-slate-100 text-white shadow-xl rounded-b-xl relative w-full min-w-0"> 
      <div className="w-full max-w-none px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-2 xs:py-4 sm:py-5">
        <div className="flex justify-between items-center w-full min-w-0">
          {/* Logo */}
          
          <div className="flex items-center -shrink-0">
            <span className="text-xl  xs:text-2xl sm:text-2xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-bold text-blue-500 hover:text-blue-600 transition-colors duration-300 cursor-pointer whitespace-nowrap">
               
              INFUSORY
            </span>
          </div>

          <div className="hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-6 2xl:space-x-8 items-center flex-shrink-0"> 
            <a 
              href="/" 
              className="text-gray-700 hover:text-blue-500 transition-all duration-300 ease-in-out font-medium text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl hover:scale-105 transform whitespace-nowrap px-1 lg:px-2"
            >
              Home
            </a>
            <a 
              href="model" 
              className="text-gray-700 hover:text-blue-500 transition-all duration-300 ease-in-out font-medium text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl hover:scale-105 transform whitespace-nowrap px-1 lg:px-2"
            >
              Models
            </a>
            <a 
              href="upload" 
              className="text-gray-700 hover:text-blue-500 transition-all duration-300 ease-in-out font-medium text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl hover:scale-105 transform whitespace-nowrap px-1 lg:px-2"
            >
              Upload
            </a>
            <a 
              href="https://infusory.in/" 
              className="text-gray-700 hover:text-blue-500 transition-all duration-300 ease-in-out font-medium text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl hover:scale-105 transform whitespace-nowrap px-1 lg:px-2"
            >
              About
            </a>
          </div>

          <div className="md:hidden flex items-center flex-shrink-0">
            <button 
              onClick={toggleMenu} 
              className="text-gray-600 hover:text-blue-500 focus:outline-none focus:text-blue-500 transition-colors duration-300 p-1 xs:p-2 rounded-lg hover:bg-gray-100 touch-manipulation" 
              aria-label="Toggle menu" 
              aria-expanded={isOpen}
            >
              <svg
                className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute left-0 right-0 bg-white shadow-2xl border-t border-gray-200 transition-all duration-300 ease-in-out z-50 w-full ${
          isOpen ? 'max-h-screen opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        } overflow-hidden`}
        style={{ top: '100%' }}
      >
        <div className="px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-3">
          <div className="flex flex-col space-y-0.5 xs:space-y-1">
            <a 
              href="/" 
              className="text-gray-700 hover:text-blue-500 hover:bg-blue-50 text-sm xs:text-base sm:text-lg font-semibold py-2 xs:py-2.5 sm:py-3 px-2 xs:px-3 sm:px-4 rounded-lg transition-all duration-300 transform hover:translate-x-1 xs:hover:translate-x-2 touch-manipulation block w-full" 
              onClick={toggleMenu}
            >
              Home
            </a>
            <a 
              href="model" 
              className="text-gray-700 hover:text-blue-500 hover:bg-blue-50 text-sm xs:text-base sm:text-lg font-semibold py-2 xs:py-2.5 sm:py-3 px-2 xs:px-3 sm:px-4 rounded-lg transition-all duration-300 transform hover:translate-x-1 xs:hover:translate-x-2 touch-manipulation block w-full" 
              onClick={toggleMenu}
            >
              Models
            </a>
            <a 
              href="upload" 
              className="text-gray-700 hover:text-blue-500 hover:bg-blue-50 text-sm xs:text-base sm:text-lg font-semibold py-2 xs:py-2.5 sm:py-3 px-2 xs:px-3 sm:px-4 rounded-lg transition-all duration-300 transform hover:translate-x-1 xs:hover:translate-x-2 touch-manipulation block w-full" 
              onClick={toggleMenu}
            >
              Upload
            </a>
            <a 
              href="https://infusory.in/" 
              className="text-gray-700 hover:text-blue-500 hover:bg-blue-50 text-sm xs:text-base sm:text-lg font-semibold py-2 xs:py-2.5 sm:py-3 px-2 xs:px-3 sm:px-4 rounded-lg transition-all duration-300 transform hover:translate-x-1 xs:hover:translate-x-2 touch-manipulation block w-full" 
              onClick={toggleMenu}
            >
              About
            </a>
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-20 z-40" 
          onClick={toggleMenu}
          style={{ top: '100%' }}
        />
      )}
    </nav>
  );
}

export default Navbar;
